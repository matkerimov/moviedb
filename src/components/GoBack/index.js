import React from 'react';
import {useHistory} from "react-router-dom";

const GoBack = () => {
    const history = useHistory()

    return (
        <>
            <button className="btn btn-outline-info" type="button" onClick={() => history.goBack()}>Go back</button>
        </>
    );
};

export default GoBack;