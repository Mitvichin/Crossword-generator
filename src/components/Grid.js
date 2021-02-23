import React from "react"

const Grid = () => {
    const grid = [
        ['r', 'o', 'o', 'm'],
        ['a', '', '', 'o'],
        ['t', '', '', 'u'],
        ['', '', '', 's'],
        ['', '', '', 'e'],
    ]


    const getLayout = () => {
        //const result = grid[0].map((item) => <span>{` ${item.toUpperCase()} `}</span>)
        const result = grid.map((row) => row.map((item, i) => <><div style={{ display: "inline-block", width: "15px", paddingLeft: "5px", paddingRight: "5px", }}>{`${item.toUpperCase()}`}</div>{i === row.length - 1 ? <br /> : ""}</>))

        return result;
    }


    return <div style={{ width: "100%", height: "100%" }}>

        {getLayout()}

    </div>
}

export { Grid }