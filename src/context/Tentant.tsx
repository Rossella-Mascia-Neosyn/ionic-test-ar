import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import { BrandConfig } from './brandConfig';

// Crea un contesto
const TenantContext = createContext<{ tenantName: string | null, setTenant: React.Dispatch<React.SetStateAction<string | null>> }>({ tenantName: null, setTenant: () => null });

export const useTenant = () => {
    return useContext(TenantContext);
};

export const TenantProvider: React.FC<PropsWithChildren> = ({ children }) => {
    const [tenant, setTenant] = useState<string | null>(null);

    return (
        <TenantContext.Provider value={{ tenantName: tenant, setTenant }}>
            {children}
        </TenantContext.Provider>
    );
};
