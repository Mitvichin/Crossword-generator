import React from "react"
import styles from "./gridLayout.module.css"

const Grid = () => {
    const grid = [
        ['r', 'o', 'o', 'm'],
        ['a', '', '', 'o'],
        ['t', '', '', 'u'],
        ['', '', '', 's'],
        ['', '', '', 'e'],
    ]


    const getLayout = () => {
        //Refactor this
        const result = grid.map((row) => row.map((item, i) => <><div className={styles.cell}>{`${item.toUpperCase()}`}</div>{i === row.length - 1 ? <br /> : ""}</>))

        return result;
    }


    return <div style={{ width: "100%", height: "100%" }}>

        {getLayout()}

    </div>
}

export { Grid }