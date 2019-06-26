import React, { Suspense, useEffect } from 'react';
import MasterLoader from './MasterLoader';
import MasterLoaderWithCache from './MasterLoaderWithCache';

const stockAPIUrl = "https://financialmodelingprep.com/api/v3/stock/real-time-price/AAPL";

const getRandomKey = () => Math.random().toString(36).substring(7);

const LoadingTest = () => {
    return (
        <div>
            <MasterLoaderWithCache
                apiUrl={stockAPIUrl}
                successCallback={(json) => {
                    const LoadedComponent = React.lazy(() => import('./StockDisplay'));
                    return {
                        component: LoadedComponent,
                        data: json
                    }
                }}
                cachedSeconds={10}
                autoReloadActive={true}
            />
        </div>
    )
}

export default LoadingTest;