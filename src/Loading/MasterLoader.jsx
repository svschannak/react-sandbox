import React, { Suspense, useEffect } from 'react';
// import LoadedComponent from './LoadedComponent';

const Loading = () => <div>Loading...</div>;

const MasterLoader = ({ stockAPIUrl, successCallback }) => {
    const [data, setData] = React.useState(undefined);
    const [UiComponent, setUiComponent] = React.useState(null);

    useEffect(() => {
        if (data === undefined) {
            fetch(stockAPIUrl)
                .then((response) => {
                    return response.json();
                }).then(data => {
                    const callBackResult = successCallback(data);
                    setData(callBackResult.data);
                    setUiComponent(callBackResult.component);
                });
        }
    });

    if (!UiComponent) return <Loading />;

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <UiComponent data={data} />
            </Suspense>
        </div>
    )
    // return <div>TEST</div>
}

export default MasterLoader;