import React, { createContext, useContext, useState } from 'react';
import { BrandConfig } from './brandConfig';

// Crea un contesto
const TenantContext = createContext<BrandConfig>({ colors: undefined, logo: '' });

export const useTenant = () => {
    return useContext(TenantContext);
};

export const TenantProvider = ({ children }) => {
    const [tenant, setTenant] = useState<BrandConfig | null>(null);

    return (
        <TenantContext.Provider value={{ tenant, setTenant }}>
            {children}
        </TenantContext.Provider>
    );
};
