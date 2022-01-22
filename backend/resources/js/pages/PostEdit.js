import React, { useState, useEffect } from 'react';
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

    const {id} = useParams();

    const [editData, setEditData] = useState({name:'', content:''});

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
                //編集対象ステータスに入れる
                setEditData(res.data);
            })
            .catch(() => {
                console.log('通信に失敗しました');
            });
    }

    //関数：編集対象のデータをlaravlで更新
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
                //結果を編集用ステータスに再設定
                setEditData(res.data);
            })
            .catch(error => {
                console.log(error);
            });
    }

    //関数：入力フォーム内のデータを編集用ステータスに反映
    function inputChange(e){
        const key = e.target.name;
        const value = e.target.value;
        editData[key] = value;
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
