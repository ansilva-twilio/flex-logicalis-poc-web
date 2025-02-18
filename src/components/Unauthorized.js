import { Box, Stack, PageHeader, PageHeaderParagraph, PageHeaderDetails, PageHeaderHeading } from '@twilio-paste/core';

function Unauthorized() {
    return (
        <Box paddingX="space100" paddingTop="space130" paddingBottom="space160">
            <PageHeader size="default">
                <PageHeaderDetails>
                <PageHeaderHeading>Acesso negado!</PageHeaderHeading>
                <PageHeaderParagraph>
                    Você não tem permissão para acessar esta página. 
                    Caso esteja utilizando dentro do Twilio Flex, por favor, tente recarregar a página.
                </PageHeaderParagraph>
                </PageHeaderDetails>
            </PageHeader>
            <Box>
                <Box display="flex" flexDirection="column" rowGap="space50" marginBottom="space90">
                    <Box display="flex" columnGap="space80" maxWidth="size180">
                        <Box maxWidth="size110">
                            <Stack orientation="horizontal">
                                <img src="https://img.freepik.com/free-psd/cross-mark-isolated_23-2151478819.jpg?t=st=1739892503~exp=1739896103~hmac=09418e71c73b388ef11ff5c9b1ae3f1f6e85b194da703a708f32fc36995d9cb2&w=826" 
                                    alt="Acesso negado." width="300" />
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default Unauthorized;