import React from "react";
import Loader from "react-loader-spinner";

const Loading = () => {
    return (
        <div
            style={{
                width: "100%",
                height: "100vh",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}
        >
            <Loader
                type="TailSpin"
                color="#00BFFF"
                height={100}
                width={100}
                timeout={3000} //3 secs
            />
        </div>
    );
};

export default Loading;
