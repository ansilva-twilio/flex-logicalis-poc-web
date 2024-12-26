import { Box } from '@twilio-paste/core/box';

function Header() {
    return (
        <>
            <Box paddingBottom="space60" display="flex" backgroundColor={"rgb(20,60,205)"}>
                <a href="https://www.la.logicalis.com/pt-br" style={{alignItems: 'center', display: 'flex', marginLeft: 'auto'}}>
                    <img src="https://www.logicalis.com/sites/default/files/styles/xs_small/public/2023-12/logicalis-logo-white.png.webp?itok=JJs-XNTj" alt="Logicalis" width={'200px'} style={{ padding: '10px', marginTop: '20px'}} /> 
                </a>
            </Box>
        </>
    );
};

export default Header;