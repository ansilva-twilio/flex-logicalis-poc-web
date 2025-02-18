import { Paragraph } from '@twilio-paste/core/paragraph';
import { Box } from '@twilio-paste/core/box';
import { PageHeader, PageHeaderDetails, PageHeaderHeading, DescriptionListSet, DescriptionList, DescriptionListTerm, DescriptionListDetails  } from '@twilio-paste/core';
import { TabPanel } from '@twilio-paste/core/tabs';
import { Heading } from '@twilio-paste/core/heading';

import WorkNotes from './WorkNotes';
import HandleEmpty from '../assets/Utils';

function TaskDetailsTabPanel (props) {
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
                                { HandleEmpty(props.data.short_description) }
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
                        <Box display="flex" columnGap="space70" width="size60">
                            <Box width="size30">
                                <DescriptionList>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Número</DescriptionListTerm>
                                        <DescriptionListDetails>{ HandleEmpty(props.data?.number) }</DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Estado</DescriptionListTerm>   
                                        <DescriptionListDetails>{ HandleEmpty(props.data?.state) }</DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Localização</DescriptionListTerm>
                                        <DescriptionListDetails>{ HandleEmpty(props.data?.location) }</DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Item de Configuração</DescriptionListTerm>
                                        <DescriptionListDetails>{ HandleEmpty(props.data['cmdb_ci.name']) }</DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Domínio</DescriptionListTerm>
                                        <DescriptionListDetails>{ HandleEmpty(props.data['sys_domain.name']) }</DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Localização do IC</DescriptionListTerm>
                                        <DescriptionListDetails>{ HandleEmpty(props.data?.u_ci_location) }</DescriptionListDetails>
                                    </DescriptionListSet>
                                </DescriptionList>
                            </Box>
                            <Box width="size30">
                                <DescriptionList>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Aberto em</DescriptionListTerm>
                                        <DescriptionListDetails>{ HandleEmpty(props.data?.opened_at) }</DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Aberto por</DescriptionListTerm>
                                        <DescriptionListDetails>{ HandleEmpty(props.data['opened_by.name'])}</DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Requisitado para</DescriptionListTerm>
                                        <DescriptionListDetails>{ HandleEmpty(props.data['request.requested_for.name'])}</DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Item de Catálogo</DescriptionListTerm>
                                        <DescriptionListDetails>{ HandleEmpty(props.data['cat_item.name'])}</DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Empresa</DescriptionListTerm>
                                        <DescriptionListDetails>{ HandleEmpty(props.data['company.name'])}</DescriptionListDetails>
                                    </DescriptionListSet>
                                </DescriptionList>
                            </Box>
                        </Box>
                        <Box width="size60" marginTop="space40">
                            <DescriptionList>
                                <DescriptionListSet>
                                    <DescriptionListTerm>Descrição Completa</DescriptionListTerm>
                                    <DescriptionListDetails>{ props.data?.description }</DescriptionListDetails>
                                </DescriptionListSet>
                            </DescriptionList>
                        </Box>
                    </Box>
                    <Box>
                        <Heading as="h2" variant="heading20" id="classification">
                        Outros
                        </Heading>
                        <Box display="flex" columnGap="space70" width="size60">
                            <Box width="size30">
                                <DescriptionList>
                                     <DescriptionListSet>
                                        <DescriptionListTerm>Tipo de Contato</DescriptionListTerm>
                                        <DescriptionListDetails>{ HandleEmpty(props.data?.contact_type) }</DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Tempo Trabalhado</DescriptionListTerm>
                                        <DescriptionListDetails>{ HandleEmpty(props.data?.time_worked) }</DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Watch List</DescriptionListTerm>
                                        <DescriptionListDetails>{ HandleEmpty(props.data?.watch_list)}</DescriptionListDetails>
                                    </DescriptionListSet>
                                </DescriptionList>
                            </Box>
                            <Box width="size30">
                                <DescriptionList>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Grupo Assignado</DescriptionListTerm>
                                        <DescriptionListDetails>{ HandleEmpty(props.data['assignment_group.name']) }</DescriptionListDetails>
                                    </DescriptionListSet>
                                    <DescriptionListSet>
                                        <DescriptionListTerm>Atribuído a</DescriptionListTerm>
                                        <DescriptionListDetails>{ HandleEmpty(props.data['assigned_to.name']) }</DescriptionListDetails>
                                    </DescriptionListSet>
                                </DescriptionList>
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <WorkNotes key={ "sc-task-worknotes-" + props.data?.number } data={ props.data?.comments_and_work_notes } />
                    </Box>
                    </Box>
                </Box>
            </Box>
        </TabPanel>
    );
};

export default TaskDetailsTabPanel;