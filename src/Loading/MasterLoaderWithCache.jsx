import React, { Suspense, useEffect } from 'react';
// import LoadedComponent from './LoadedComponent';

const Loading = () => <div>Loading...</div>;

const checkIfUrlExistsInCache = (url) => {
    return localStorage.getItem(url) !== null;
}

const saveCachedData = (apiUrl, data) => {
    const cachedData = {
        data: data,
        timestamp: Date.now()
    }
    localStorage.setItem(apiUrl, JSON.stringify(cachedData));
}

const MasterLoaderWithCache = ({ apiUrl, successCallback, cachedSeconds = 5, autoReloadActive = false }) => {
    const [data, setData] = React.useState(undefined);
    const [isLoading, setIsLoading] = React.useState(false);
    const [UiComponent, setUiComponent] = React.useState(null);

    const renewComponentData = (data) => {
        const callBackResult = successCallback(data);
        setData(callBackResult.data);
        setUiComponent(callBackResult.component);
    }

    const fetchData = () => {
        fetch(apiUrl)
            .then((response) => {
                return response.json();
            }).then(data => {
                renewComponentData(data);
                saveCachedData(apiUrl, data);
            });
    }

    const refreshData = () => {
        let refreshTime = cachedSeconds * 1000;
        if (checkIfUrlExistsInCache(apiUrl)) {
            const cachedData = JSON.parse(localStorage.getItem(apiUrl));
            const secondsElapsed = (Date.now() - cachedData.timestamp) / 1000;

            refreshTime = refreshTime - secondsElapsed;

            if (secondsElapsed > cachedSeconds) {
                fetchData();
            } else {
                renewComponentData(cachedData.data);
            }
        } else {
            fetchData();
        }
        if (autoReloadActive === true) {
            setTimeout(refreshData, refreshTime);
        }
    }

    useEffect(() => {
        if (data === undefined && isLoading === false) {
            setIsLoading(true);
            refreshData();

        }
    });

    if (!UiComponent) return <Loading />;

    return (
        <div>
            <Suspense fallback={<Loading />}>
                <UiComponent data={data} />
                <button onClick={fetchData}>Reload data</button>
            </Suspense>
        </div>
    )
}

export default MasterLoaderWithCache;