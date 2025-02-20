import * as React from 'react';

import { Box } from '@twilio-paste/core/box';

export const Header = (): React.ReactElement => {
    return (
        <>
            <Box paddingBottom="space60" display="flex" style={{ backgroundColor: "#143ccd" }}>
                <a href="https://www.la.logicalis.com/pt-br" style={{alignItems: 'center', display: 'flex', marginLeft: 'auto'}}>
                    <img src="https://www.logicalis.com/sites/default/files/styles/xs_small/public/2023-12/logicalis-logo-white.png.webp?itok=JJs-XNTj" alt="Logicalis" width={'200px'} style={{ padding: '10px', marginTop: '20px'}} /> 
                </a>
            </Box>
        </>
    );
};