<?php
// web/index.php

require_once __DIR__.'/vendor/autoload.php';

$app = new Silex\Application();

$app->register(new Silex\Provider\DoctrineServiceProvider(), array(
    'db.options' => array(
        'driver'    => 'pdo_mysql',
        'host'      => 'localhost',
        'dbname'    => 'frisch_io_db',
        'user'      => 'root',
        'password'  => '',
        'charset'   => 'utf8'
    )
));

$app->get('/seasons', function () use ($app){
    $sql = "SELECT name AS id, title FROM pk_seasons";

    $entries = $app['db']->fetchAll($sql);

    return $app->json($entries);  
});

$app->get('/rounds/{season}', function ($season) use ($app){

    if ($season != 'all'){
        $sql = "
            SELECT  t.ID AS id,
                    t.name AS title 

            FROM pk_tournaments AS t
            INNER JOIN pk_seasons AS s
            ON t.FK_seasons_ID = s.ID 
            WHERE s.name = ".$season;
    }else{
        $sql = "SELECT ID FROM pk_tournaments WHERE 0 = 1";
    }

    $entries = $app['db']->fetchAll($sql);

    return $app->json($entries);  
});

$app->get('/leaderboard/{sortEntity}/{sortOrder}/{season}/{round}', function ($sortEntity, $sortOrder, $season, $round) use ($app) {

    $sql = "
        SELECT

        m.name,
    ";

    // appearances
    $sql .= "

        IFNULL(
            (
                SELECT COUNT(mt1.FK_members_ID)
                FROM pk_members_tournaments AS mt1
                WHERE mt1.FK_members_ID = m.ID
    ";

                if ($round != 'all'){
                    $sql .= "
                        AND mt1.FK_tournaments_ID = mt.FK_tournaments_ID
                    ";
                }

    $sql .= "    

                GROUP BY mt1.FK_members_ID
            )
        , 0) AS appearances,
    ";

    // points - formula: 10 * [sqrt(<number of participants>)/sqrt(<player rank in tournament>)] * [1+log(<buyin>+0,25)]
    //  -- todo: select buyin dynamically - it's hardcoded to 100 as of right now
    $sql .= "
        (
            SELECT 
                ROUND(
                    SUM(

                        10 * 
                        ( 
                            SQRT(
                                (
                                    SELECT COUNT(FK_members_ID) 
                                    FROM pk_members_tournaments AS mtsubsub 
                                    WHERE mtsubsub.FK_tournaments_ID = mtsub.FK_tournaments_ID 
                                ) 
                            )
                            /
                            SQRT( mtsub.placeFinished )
                        ) 

                        *
                        ( 1 + LOG( 100 + 0.25) )

                    )
            )

            FROM pk_members_tournaments AS mtsub
            INNER JOIN pk_members AS msub
            ON msub.ID = mtsub.FK_members_ID

            WHERE mtsub.FK_members_ID = m.ID
    ";


            if ($round != 'all'){
                $sql .= "
                    AND mtsub.FK_tournaments_ID = mt.FK_tournaments_ID
                ";
            }


    $sql .= "


            GROUP BY mtsub.FK_members_ID

        ) AS points,
    ";

    // pointsPerGame
    $sql .= "
        (
            SELECT(
                ROUND(
                    (points / appearances)
                , 2)
            )
        ) AS pointsPerGame,
    ";

    // hits
    $sql .= "
        SUM( mt.knockouts ) AS hits,
    ";

    // hitsPerGame
    $sql .= "
        (
            SELECT(
                ROUND(
                    (SUM( mt.knockouts ) / appearances)
                , 2)
            )
        ) AS hitsPerGame,
    ";

    // moneyWon
    $sql .= "
        SUM( mt.prize ) AS moneyWon,
    ";

    // moneyWonPerGame
    $sql .= "
        (
            SELECT(
                ROUND(
                    (SUM( mt.prize ) / appearances)
                    , 2
                )
            )
        ) AS moneyWonPerGame,
    ";

    // inTheMoney
    $sql .= "
        IFNULL(
            (
                SELECT COUNT(mt2.FK_members_ID)
                FROM pk_members_tournaments AS mt2
                WHERE mt2.FK_members_ID = m.ID  
                AND mt2.placeFinished < 5 
        ";

                if ($round != 'all'){
                    $sql .= "
                        AND mt2.FK_tournaments_ID = mt.FK_tournaments_ID
                    ";
                }

    $sql .="


                GROUP BY mt2.FK_members_ID
            )
        , 0) AS inTheMoney,
    ";

    // inTheMoneyPercentage
    $sql .= "
        (
            SELECT( 
                ROUND(
                    (inTheMoney / appearances) * 100
                )
            )
        )
        AS inTheMoneyPercentage
    ";

    // no more column definitions...
    $sql .= "

        FROM pk_members_tournaments AS mt
        INNER JOIN pk_members AS m ON m.ID = mt.FK_members_ID
    ";

    if ($season == 'all'){
    }else{
        $sql .= "
            INNER JOIN pk_tournaments AS t ON t.ID = mt.FK_tournaments_ID
        ";
    }



    $sql .= "
        WHERE 0 = 0 
    ";

    if ($round != 'all'){
        $sql .= "
            AND mt.FK_tournaments_ID = ".$round."
        ";
    }

    if ($season == 'all'){

    }else if ($season == 'latest'){
        $sql .= "
            AND t.FK_seasons_ID = (SELECT id FROM pk_seasons ORDER BY name DESC LIMIT 1)
        ";
    }else{
        $sql .= "
            AND t.FK_seasons_ID = (SELECT id FROM pk_seasons WHERE name = ".$season.")
        ";
    }

    $sql .= "
        GROUP BY m.ID

        ORDER BY ". $sortEntity ." ".$sortOrder."
    ";

    $entries = $app['db']->fetchAll($sql);

    return $app->json($entries);
});

$app->run();
?>