import { Box, Button, Stack, Input, PageHeader, PageHeaderParagraph, PageHeaderDetails, PageHeaderHeading } from '@twilio-paste/core';
import { SearchIcon } from '@twilio-paste/icons/esm/SearchIcon';
import { useUID } from "@twilio-paste/core/uid-library";

function NotFound() {
    return (
        <Box paddingX="space100" paddingTop="space130" paddingBottom="space160">
            <PageHeader size="default">
                <PageHeaderDetails>
                <PageHeaderHeading>Não encontrado!</PageHeaderHeading>
                <PageHeaderParagraph>
                    Não foram identificados registros a partir deste número de Incidente ou Requisição. Por favor, utilize a busca abaixo para a identificação correta.
                </PageHeaderParagraph>
                </PageHeaderDetails>
            </PageHeader>
            <Box>
                <Box display="flex" flexDirection="column" rowGap="space50" marginBottom="space90">
                    <Box display="flex" columnGap="space80" maxWidth="size180">
                        <Box maxWidth="size110">
                            <Stack orientation="horizontal">
                                <Input width="300px"
                                    type="text"
                                    insertBefore={<SearchIcon decorative color="colorTextPrimary" />}
                                    placeholder="INC ou REQ..."
                                    aria-label={useUID()} />
                                <Box width="10px" />
                                <Button width="150px" variant='primary'>Buscar</Button>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};

export default NotFound;