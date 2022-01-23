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

//関数：コンポーネント定義
function Home() {
    //定義したスタイルを利用するための設定
    const classes = useStyles();

    //バックエンドから渡されるpostsステートの定義
    const [posts, setPosts] = useState([]);

    //フォームの入力値を管理するステートの定義
    const [formData, setFormData] = useState({name:'', content:''});

    //関数：バックエンドから一覧情報を取得しステートpostsにセットする
    const getPostsData = () => {
        axios
            .get('/api/posts')
            .then(response => {
                setPosts(response.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    //初期画面に到着したらgetPostsDataを読んでpostsにセットする
    useEffect(() => {
        getPostsData();
    },[])

    //関数：入力がされたら（都度）入力値を変更する。'e'にはon changeイベントのobjが入る。
    const inputChange = (e) => {
        const key = e.target.name;
        const value = e.target.value;
        //{name:'', content:''}の形で変化があった部分のみに更新をかける
        formData[key] = value;
        //React側で差分比較ができるようにdeep copyを行う
        let data = Object.assign({}, formData);
        //ステート更新
        setFormData(data);
    }

    //関数：登録ボタンの押下時にデータ登録
    const createPost = async() => {
        //オブジェクトの中身が空"緩い等価"だと弾く
        if(formData == ''){
            return;
        }
        //入力でバックエンドを叩いて新規作成
        await axios
            .post('/api/post/create', {
                name: formData.name,
                content: formData.content
            })
            .then((res) => {
                //現在のpostsをDeepCopy
                const tempPosts = posts
                //現在のpostsに返り値をに追加する
                tempPosts.push(res.data);
                //postsステート更新
                setPosts(tempPosts)
                //入力値を空白にする
                setFormData('');
            })
            .catch(error => {
                console.log(error);
            });
    }

    //関数：データ削除
    const deletePost = async (post) => {
        await axios
            // バックエンドAPIにidを渡して削除
            .post('/api/delete', {
            id: post.id
        })
        .then((res) => {
            // クラス型での書き方。現在はフック型(getPostsData)同様に書く。
            this.setState({
                posts: res.posts
            });
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
     *バックエンド側から取得したpostsをフロントエンド側で使うオブジェクト型rowsに加工し表示
     */
    let rows = [];
    posts.map((post) =>
        rows.push({
            name: post.name,
            content: post.content,
            // 別ページ（別コンポーネントで編集を実行）
            editBtn: <Button color="secondary" variant="contained" href={`/post/edit/${post.id}`}>編集</Button>,
            //クリックしたタイミングで削除処理を実行
            deleteBtn: <Button color="primary" variant="contained" href="/" onClick={() => deletePost(post)}>完了</Button>,
        })
    );

    return (
        <div>
            <h1>タスク管理</h1>
                <Card className={classes.card}>
                    {/* 状態管理/入力時の更新関数/登録処理関数をpropsとして渡す*/}
                    <PostFrom data={formData} inputChange={inputChange} btnFunc={createPost} />
                </Card>
                <Card className={classes.card}>
                    {/* rowsデータを配下のcomponentに渡す */}
                    <MainTable headerList={headerList} rows={rows} />
                </Card>
        </div>
    )
}

export default Home;
