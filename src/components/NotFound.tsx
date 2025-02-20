import * as React from 'react';
import { useState } from 'react';

import { Box, Button, Stack, Input, PageHeader, PageHeaderParagraph, PageHeaderDetails, PageHeaderHeading } from '@twilio-paste/core';
import { SearchIcon } from '@twilio-paste/icons/esm/SearchIcon';
import { useUID } from "@twilio-paste/core/uid-library";

export const NotFound = (): React.ReactElement => {
    const [inputValue, setInputValue] = useState("");
    const handleInputChange = (event: any) => {
        setInputValue(event.target.value);
    };

    const handleKeyDown = (event: any) => {
        if (event.key === "Enter") {
            searchItem();
        }
    };

    const searchItem = () => {
        const number = inputValue;
        if (!number.startsWith('INC') && !number.startsWith('RITM')) {
            alert('Apenas Incidentes (INC) ou Requisições (RITM)!');
            return;
        }
        const params = Object.fromEntries(new URLSearchParams(window.location.search));
        let queryString = `?token=${params.token}`;
        if (number.startsWith('INC')) {
            queryString += `&incident=${number}`;
        } else if (number.startsWith('RITM')) {
            queryString += `&requestItem=${number}`;
        }
        window.location.href = window.location.origin + window.location.pathname + queryString;
      };

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
                            <Stack spacing="space0" orientation="horizontal">
                                <Input
                                    type="text"
                                    value={inputValue} 
                                    onChange={handleInputChange} 
                                    onKeyDown={handleKeyDown}
                                    insertBefore={<SearchIcon decorative color="colorTextPrimary" />}
                                    placeholder="INC ou RITM..."
                                    aria-label={useUID()} />
                                <Box width="10px" />
                                <Button onClick={searchItem} variant='primary'>Buscar</Button>
                            </Stack>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Box>
    );
};