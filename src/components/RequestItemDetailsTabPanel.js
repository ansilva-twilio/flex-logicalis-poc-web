import { useState } from 'react';

import { Paragraph } from '@twilio-paste/core/paragraph';
import { Box } from '@twilio-paste/core/box';
import { Label, Grid, Column, HelpText, Card, PageHeader, PageHeaderDetails, PageHeaderHeading, PageHeaderInPageNavigation, InPageNavigation, InPageNavigationItem, DescriptionListSet, DescriptionList, DescriptionListTerm, DescriptionListDetails, TextArea, Button, Checkbox, Stack } from '@twilio-paste/core';
import { TabPanel } from '@twilio-paste/core/tabs';
import { Heading } from '@twilio-paste/core/heading';
import { useUID } from "@twilio-paste/core/uid-library";

function RequestItemDetailsTabPanel (props) {
    const [isComment, setIsComment] = useState(false);

    return (    
        <TabPanel element="MAIN_TAB_PANEL">
            <Box>
                <PageHeader size="default">
                    <PageHeaderDetails>
                        <PageHeaderHeading>
                            <Heading as="span" variant="heading10">
                            { props.data.number }
                            </Heading>
                            <Paragraph>
                                { props.data.short_description }
                            </Paragraph>
                        </PageHeaderHeading>
                    </PageHeaderDetails>
                    <PageHeaderInPageNavigation>
                    <InPageNavigation aria-label={useUID()}>
                        <InPageNavigationItem href="#" currentPage>Dados</InPageNavigationItem>
                        <InPageNavigationItem href="#classification">Classificação</InPageNavigationItem>
                        <InPageNavigationItem href="#notes">Notas</InPageNavigationItem>
                    </InPageNavigation>
                    </PageHeaderInPageNavigation>
                </PageHeader>
                <Box display="flex" flexDirection="column">
                    <Box display="flex" flexDirection="column" rowGap="space100">
                    <Box>
                        <Heading as="h2" variant="heading20">
                        Dados
                        </Heading>
                        <Box display="flex" columnGap="space70" width="size60">
                        <Box width="size30">
                            <DescriptionList>
                            <DescriptionListSet>
                                <DescriptionListTerm>Número</DescriptionListTerm>
                                <DescriptionListDetails>{ props.data?.number}</DescriptionListDetails>
                            </DescriptionListSet>
                            <DescriptionListSet>
                                <DescriptionListTerm>Estado</DescriptionListTerm>
                                <DescriptionListDetails>{ props.data?.state }</DescriptionListDetails>
                            </DescriptionListSet>
                            <DescriptionListSet>
                                <DescriptionListTerm>Descrição</DescriptionListTerm>
                                <DescriptionListDetails>{ props.data?.short_description }</DescriptionListDetails>
                            </DescriptionListSet>
                            </DescriptionList>
                        </Box>
                        <Box width="size30">
                            <DescriptionList>
                            <DescriptionListSet>
                                <DescriptionListTerm>Aberto em</DescriptionListTerm>
                                <DescriptionListDetails>{ props.data?.opened_at }</DescriptionListDetails>
                            </DescriptionListSet>
                            <DescriptionListSet>
                                <DescriptionListTerm>Aberto por</DescriptionListTerm>
                                <DescriptionListDetails>{ props.data?.caller_id?.display_value}</DescriptionListDetails>
                            </DescriptionListSet>
                            <DescriptionListSet>
                                <DescriptionListTerm>Item de Configuração</DescriptionListTerm>
                                <DescriptionListDetails>{ props.data?.configuration_item?.display_value}</DescriptionListDetails>
                            </DescriptionListSet>
                            </DescriptionList>
                        </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Heading as="h2" variant="heading20" id="classification">
                        Classificação
                        </Heading>
                        <Box display="flex" columnGap="space70" width="size60">
                            <Box width="size30">
                                <DescriptionList>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Prioridade</DescriptionListTerm>
                                        <DescriptionListDetails>{props.data?.priority}</DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Categoria</DescriptionListTerm>
                                        <DescriptionListDetails>{props.data?.category}</DescriptionListDetails>
                                    </DescriptionListSet>
                                </DescriptionList>
                            </Box>
                            <Box width="size30">
                                <DescriptionList>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Grupo Assignado</DescriptionListTerm>
                                        <DescriptionListDetails>{ props.data?.assignment_group?.display_value}</DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Atribuído a</DescriptionListTerm>
                                        <DescriptionListDetails>{ props.data?.assigned_to?.display_value}</DescriptionListDetails>
                                    </DescriptionListSet>
                                </DescriptionList>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Box display="flex" width="100%" justifyContent="space-between" alignItems="flex-start">
                            <Heading as="h2" variant="heading20" id="notes">
                                Notas
                            </Heading>
                        </Box>
                        <Box maxWidth="size80">
                            <Grid gutter="space30">
                                <Column span={8}>
                                    <Stack orientation="vertical">
                                        <Label htmlFor="note" required>Para adicionar uma nota, digite abaixo.  </Label>
                                        <TextArea aria-describedby="note_help_text" id="note" name="note" />
                                        { isComment && <HelpText id="note_help_text">Este texto <strong>será</strong> visível ao cliente.</HelpText> }
                                        { !isComment && <HelpText id="note_help_text">Este texto <strong>não será</strong> visível ao cliente.</HelpText> }
                                    </Stack>
                                </Column>
                                <Column span={4}>
                                <Stack orientation="vertical" spacing='space60'>
                                        <Checkbox
                                            checked={isComment}
                                            id="note_type"
                                            value="note_type"
                                            name="note_type"
                                            onChange={(event) => {
                                                setIsComment(event.target.checked);
                                            }}
                                            >
                                            Visível ao cliente?
                                        </Checkbox>
                                        <Button variant='secondary'>Enviar</Button>
                                    </Stack>
                                </Column>
                                </Grid>

                            <br />
                        </Box>
                        <Box maxWidth="size80">
                            <Paragraph>
                                Abaixo estão as notas de trabalho (amarelas - não visíveis ao cliente) e comentários (brancas - visíveis ao cliente).
                            </Paragraph>
                        </Box>
                        <Box>
                            <Card element='YELLOW_NOTE_CARD'>
                                <Paragraph>
                                    Exemplo de nota amarela
                                </Paragraph>
                                <Paragraph marginBottom="space0">
                                    — Luiz Cordeiro às 21:31:18 do dia 25/12/2024.
                                </Paragraph>
                            </Card>
                        </Box>
                        <br />
                        <Box>
                            <Card element='WHITE_NOTE_CARD'>
                                <Paragraph>
                                    Exemplo de nota branca
                                </Paragraph>
                                <Paragraph marginBottom="space0">
                                    — Cliente às 19:37:02 do dia 25/12/2024.
                                </Paragraph>
                            </Card>
                        </Box>
                    </Box>
                    </Box>
                </Box>
            </Box>
        </TabPanel>
    );
};

export default RequestItemDetailsTabPanel;