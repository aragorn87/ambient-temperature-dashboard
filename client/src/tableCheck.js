import React from 'react'

function Row(item, index) {
    let dateString = new Date(item['ts']).toISOString()
    let numberReading = item['value']['$numberDecimal']

    return <tr key = {`${index}`}>
                <td>{dateString}</td>
                <td>{numberReading}</td>
            </tr>
}

function Table(props) {
    if (props.data) {
        return (
            <div>
                <table border="1">
                    <tr>
                        <th>Timestamp</th>
                        <th>Reading</th>
                    </tr>
                    <tbody>
                        {props.data.map((item, index) => Row(item, index))}
                    </tbody>
                </table>
            </div>
        )
    } else {
        return (
            <div>
                We havent't found anything yet
            </div>
        )
    }
}

export default Table