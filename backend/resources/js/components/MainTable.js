import React from 'react';
//material-ui取得
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import purple from '@material-ui/core/colors/purple';
//makeStylesスタイル作成用hook、createStylesは意味なしTypeScriptの型拡張を無効にすること
import { makeStyles, createStyles } from '@material-ui/core/styles';

//スタイル作成用hook
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

function MainTable(props) {
    //定義したスタイルを利用するための設定
    const classes = useStyles();

    //親コンポーネントからpropsで受け取る
    const {headerList, rows} = props;

    return (
        <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
                {/* ヘッダー部分 */}
                <TableHead className={classes.tableHead}>
                    <TableRow>
                        {headerList.map((item, index) => (
                            <TableCell align="center" key={index}>{item}</TableCell>
                        ))}
                    </TableRow>
                </TableHead>
                 {/* ボディ部分 */}
                 <TableBody>
                    {rows.map((row, index) => (
                        <TableRow key={index}>
                            {/* objに対してのmap処理はObject.keys()でkeyの配列の形に変換して取得する*/}
                            {Object.keys(row).map((key, i) => (
                                <TableCell align="center" key={i}>{row[key]}</TableCell>
                                )
                            )}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
}

export default MainTable;
