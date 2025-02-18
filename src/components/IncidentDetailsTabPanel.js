import React, { useState, useEffect } from 'react';

import { Paragraph } from '@twilio-paste/core/paragraph';
import { Box } from '@twilio-paste/core/box';
import { Combobox, Label, Grid, Column, HelpText, Input, Card, PageHeader, PageHeaderDetails, PageHeaderHeading, DescriptionListSet, DescriptionList, DescriptionListDetails, TextArea, Button, Checkbox, Stack } from '@twilio-paste/core';
import { TabPanel } from '@twilio-paste/core/tabs';
import { Heading } from '@twilio-paste/core/heading';

function IncidentDetailsTabPanel (props) {
    const [isComment, setIsComment] = useState(false);
    const [priority, setPriority] = useState('');
    const [impacts, setImpacts] = useState([]);
    const [selectedImpact, setSelectedImpact] = useState(0);
    const [urgencies, setUrgencies] = useState([]);
    const [selectedUrgency, setSelectedUrgency] = useState(0);
    
    const incidentStates = [ '1 - Novo', '2 - Em andamento', '3 - Pendente', '4 - Encerrado'];
    const assignmentGroups = [ 'N1', 'N2', 'N3' ];
    const assignableUsers = [ 'André Silva', 'Luiz Cordeiro' ];

    useEffect(() => {
        setImpacts([ 1, 2, 3, 4, 5 ]);
        setSelectedImpact(props.data?.impact);
        setUrgencies([ 1, 2, 3, 4, 5]);
        setSelectedUrgency(props.data?.urgency);
    // eslint-disable-next-line 
    }, []); // Empty dependency array ensures this runs only once after mounting

    // TODO: colocar regra para calcular prioridade de acordo com os valores de Impacto e Urgência (Matriz)
    useEffect(() => {
        if (selectedImpact <= 3 && selectedUrgency <= 3) {
            setPriority('1 - Baixa');
        } else if (
            (selectedImpact > 3 && selectedUrgency <= 3) || 
            (selectedUrgency > 3 && selectedImpact <= 3) || 
            (selectedImpact === 4 && selectedUrgency === 4)
        ) {
            setPriority('2 - Média');
        } else {
            setPriority('3 - Alta');
        }
    }, [selectedImpact, selectedUrgency]);

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
                </PageHeader>
                <Box display="flex" flexDirection="column">
                    <Box display="flex" flexDirection="column" rowGap="space100">
                    <Box>
                        <Heading as="h2" variant="heading20">
                        Dados
                        </Heading>
                        <Box display="flex" columnGap="space70" width="100%">
                            <Box width="50%">
                                <DescriptionList>
                                <DescriptionListSet>
                                    <DescriptionListDetails>
                                        <Label htmlFor='number' required>Número</Label>
                                        <Input id="number" name="number" type="text" value={props.data?.number} readOnly />
                                    </DescriptionListDetails>
                                </DescriptionListSet>
                                <DescriptionListSet>
                                    <DescriptionListDetails>
                                        <Combobox id="state" name="state" items={incidentStates} initialSelectedItem={props.data?.state} labelText="Estado" required />
                                    </DescriptionListDetails>
                                </DescriptionListSet>
                                <DescriptionListSet>
                                    <DescriptionListDetails>
                                        <Label htmlFor='short_description' required>Descrição</Label>
                                        <Input id="short_description" name="short_description" type="text" value={props.data?.short_description} readOnly />
                                    </DescriptionListDetails>
                                </DescriptionListSet>
                                </DescriptionList>
                            </Box>
                            <Box width="50%">
                                <DescriptionList>
                                <DescriptionListSet>
                                    <DescriptionListDetails>
                                        <Label htmlFor='opened_at' required>Aberto em</Label>
                                        <Input id="opened_at" name="opened_at" type="text" value={ props.data?.opened_at } readOnly />
                                    </DescriptionListDetails>
                                </DescriptionListSet>
                                <DescriptionListSet>
                                    <DescriptionListDetails>
                                        <Label htmlFor='opened_by' required>Aberto por</Label>
                                        <Input id="opened_by" name="opened_by" type="text" value={ props.data?.caller_id?.display_value } readOnly />
                                    </DescriptionListDetails>
                                </DescriptionListSet>
                                <DescriptionListSet>
                                    <DescriptionListDetails>
                                        <Label htmlFor='configuration_item' required>Item de Configuração</Label>
                                        <Input id="configuration_item" name="configuration_item" type="text" value={ props.data?.configuration_item?.display_value } readOnly />
                                    </DescriptionListDetails>
                                </DescriptionListSet>
                                </DescriptionList>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Heading as="h2" variant="heading20" id="classification">
                        Classificação
                        </Heading>
                        <Box display="flex" columnGap="space70" width="100%">
                            <Box width="50%">
                                <DescriptionList>
                                    <DescriptionListSet>
                                        <DescriptionListDetails>
                                            <Combobox id="impact" name="impact" items={impacts} 
                                                selectedItem={selectedImpact}
                                                onSelectedItemChange={changes => {
                                                    console.log(changes);
                                                    setSelectedImpact(changes.selectedItem);
                                                }} 
                                                labelText="Impacto" required />
                                        </DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListDetails>
                                            <Combobox id="urgency" name="urgency" items={urgencies} 
                                                selectedItem={selectedUrgency}
                                                onSelectedItemChange={changes => {
                                                    setSelectedUrgency(changes.selectedItem);
                                                }}  
                                                labelText="Urgência" required />
                                        </DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListDetails>
                                        <Label htmlFor='priority' required>Prioridade</Label>
                                        <Input id="priority" name="priority" type="text" value={ priority } readOnly />
                                        </DescriptionListDetails>
                                    </DescriptionListSet>
                                </DescriptionList>
                            </Box>
                            <Box width="50%">
                                <DescriptionList>
                                    <DescriptionListSet>
                                        <DescriptionListDetails>
                                            <Label htmlFor='category' required>Categoria</Label>
                                            <Input id="category" name="ategory" type="text" value={ props.data?.category } readOnly />
                                        </DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListDetails>
                                            <Combobox id="assignment_group" name="assignment_group" items={assignmentGroups} initialSelectedItem={ props.data?.assignment_group?.display_value} labelText="Grupo Assignado" required />
                                        </DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListDetails>
                                            <Combobox id="assigned_to" name="assigned_to" items={assignableUsers} initialSelectedItem={ props.data?.assigned_to?.display_value } labelText="Atribuido a" required />
                                        </DescriptionListDetails>
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
                                        <Checkbox checked={isComment} id="note_type" value="note_type" name="note_type" 
                                            onChange={(event) => { setIsComment(event.target.checked); }}>
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
                        {props.data.comments_and_worknotes?.map((item, index) => (
                            <React.Fragment key={'work_note_' + index}>
                                <Box>
                                    <Card element={item.journal_type === 'work_notes' ? "YELLOW_NOTE_CARD" : "WHITE_NOTE_CARD"}>
                                        <Paragraph>{item.value}</Paragraph>
                                        <Paragraph marginBottom="space0">
                                            — {item.sys_created_by} - {item.sys_created_on}.
                                        </Paragraph>
                                    </Card>
                                </Box>
                                <br />
                            </React.Fragment>
                        ))}
                    </Box>
                    </Box>
                </Box>
            </Box>
        </TabPanel>
    );
};

export default IncidentDetailsTabPanel;