//1行で複数をインポート
import React, { useState, useEffect }  from 'react';
//API連携用を取得
import axios from 'axios';
//material-ui取得
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { Button, Card } from '@material-ui/core';
import purple from '@material-ui/core/colors/purple';
//各コンポーネント取得
import MainTable from '../components/MainTable';

//スタイルの定義
const useStyles = makeStyles((theme) => createStyles({
    card: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
    table: {
        minWidth: 650,
      },
    tableHead: {
        backgroundColor: purple['A100'],
    },
}));

//headrListの下あたりにrowsを定義する
let rows = [
    {
        name: "モーリー",
        content: "肩トレ",
        editBtn: <Button color="secondary" variant="contained">編集</Button>,
        deleteBtn: <Button color="primary" variant="contained">完了</Button>,
    },{
        name: "ドンキーコング",
        content: "バナナ補給",
        editBtn: <Button color="secondary" variant="contained">編集</Button>,
        deleteBtn: <Button color="primary" variant="contained">完了</Button>,
    },
];

//ヘッダーのコンテンツ用の配列定義
const headerList = ['名前', 'タスク内容', '編集', '完了'];

function Home() {
    //定義したスタイルを利用するための設定
    const classes = useStyles();

    //postsの状態を管理する
    const [posts, setPosts] = useState([]);

    //画面に到着したらgetPostsDataを呼ぶ
    useEffect(() => {
        getPostsData();
    },[])

    //一覧情報を取得しステートpostsにセットする
    const getPostsData = () => {
        axios
            .get('/api/posts')
            .then(response => {
                setPosts(response.data);
                console.log(response.data); //取得データ確認用のconsole.log()
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    return (
        <div>
            <h1>タスク管理</h1>
                <Card className={classes.card}>
                    {/* データを配下のcomponentに渡す */}
                    <MainTable headerList={headerList} rows={rows} />
                </Card>
        </div>
    )
}

export default Home;
