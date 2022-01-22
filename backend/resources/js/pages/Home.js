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
import PostFrom from '../components/PostFrom';

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

//ヘッダーのコンテンツ用の配列定義
const headerList = ['名前', 'タスク内容', '編集', '完了'];

function Home() {
    //定義したスタイルを利用するための設定
    const classes = useStyles();

    //postsの状態を管理する
    const [posts, setPosts] = useState([]);

    //フォームの入力値を管理するステートの定義
    const [formData, setFormData] = useState({name:'', content:''});

    //関数：一覧情報を取得しステートpostsにセットする
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

    //初期画面に到着したらgetPostsDataを呼ぶ
    useEffect(() => {
        getPostsData();
    },[])

    //関数：入力がされたら（都度）入力値を変更する
    const inputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        //{name:'', content:''}の形で変化があった部分のみに更新をかける
        formData[key] = value;
        //React側で差分比較ができるようにdeep copyを行う
        let data = Object.assign({}, formData);
        setFormData(data);
    }

    //関数：登録ボタンが押下時のデータ登録
    const createPost = async() => {
        //空だと弾く
        if(formData == ''){
            return;
        }
        //入力値を投げる
        await axios
            .post('/api/post/create', {
                name: formData.name,
                content: formData.content
            })
            .then((res) => {
                //DeepCopy
                const tempPosts = posts
                //返り値を現在のpostsに追加する
                tempPosts.push(res.data);
                setPosts(tempPosts)
                setFormData('');
            })
            .catch(error => {
                console.log(error);
            });
    }

    // let rows = [
    //     {
    //         name: "モーリー",
    //         content: "肩トレ",
    //         editBtn: <Button color="secondary" variant="contained">編集</Button>,
    //         deleteBtn: <Button color="primary" variant="contained">完了</Button>,
    //     },{
    //         name: "ドンキーコング",
    //         content: "バナナ補給",
    //         editBtn: <Button color="secondary" variant="contained">編集</Button>,
    //         deleteBtn: <Button color="primary" variant="contained">完了</Button>,
    //     },
    // ];

    /**
     * 空配列rowsにmap中のpostのデータを整形して配列の要素として追加
     *バックエンド側から取得したデータ(posts)をフロントエンド側で使う形に整形する変数(rows)に加工し表示
     */
    let rows = [];
    posts.map((post) =>
        rows.push({
            name: post.name,
            content: post.content,
            editBtn: <Button color="secondary" variant="contained">編集</Button>,
            deleteBtn: <Button color="primary" variant="contained">完了</Button>,
        })
    );

    return (
        <div>
            <h1>タスク管理</h1>
                <Card className={classes.card}>
                    {/* 状態管理と入力があった際の更新用、 登録処理関数をpropsとして渡す*/}
                    <PostFrom data={formData} inputChange={inputChange} btnFunc={createPost} />
                </Card>
                <Card className={classes.card}>
                    {/* データを配下のcomponentに渡す */}
                    <MainTable headerList={headerList} rows={rows} />
                </Card>
        </div>
    )
}

export default Home;
