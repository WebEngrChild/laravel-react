import React, { useState, useEffect } from 'react'
//react routerでパラメータを渡す際に利用するフック
import { useParams } from "react-router-dom";
import { Card } from '@material-ui/core';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import PostFrom from '../components/PostFrom';


const useStyles = makeStyles((theme) => createStyles({
    card: {
        margin: theme.spacing(5),
        padding: theme.spacing(3),
    },
}));

//関数：関数コンポーネント
function PostEdit() {
    const classes = useStyles();
    //{id}は<Route path='/post/edit/:id'と合わせる必要がある
    const {id} = useParams();
    //編集画面用の入力ステート
    const [editData, setEditData] = useState({name:'', content:''});

    //画面描画時に編集対象データを取得
    useEffect(() => {
        getEditData();
      }, [])

    //関数：編集対象のデータをlaravelから取得
    function getEditData(){
        axios
            .post('/api/edit', {
                id: id
            })
            .then(res => {
                //編集対象ステートに入れる
                setEditData(res.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    //関数：編集対象のステートデータをlaravlで更新
    function updatePost(){
        if(editData == ''){
            return;
        }
        //入力値を投げる
        axios
            .post('/api/update', {
                id: id,
                name: editData.name,
                content: editData.content
            })
            .then((res) => {
                //結果を編集用ステートに再設定
                setEditData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    //関数：入力フォーム内のデータを編集用ステートに反映
    function inputChange(e){
        const key = e.target.name;
        const value = e.target.value;
        //{name:'', content:''}の形で変化があった部分のみに更新をかける
        editData[key] = value;
        //React側で差分比較ができるようにdeep copyを行う。第一引数を{}にすることでクローンができる。
        let data = Object.assign({}, editData);
        setEditData(data);
    }

    return (
        <div className="container">
            <div className="row justify-content-center">
                <div className="col-md-8">
                    <div className="card">
                        <h1>タスク編集</h1>
                        <Card className={classes.card}>
                            {/* 入力フォームは全て共通 */}
                            <PostFrom data={editData}  inputChange={inputChange} btnFunc={updatePost} />
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default PostEdit;
