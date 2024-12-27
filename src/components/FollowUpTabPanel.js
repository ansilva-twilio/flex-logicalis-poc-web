import { DatePicker, TimePicker, HelpText, Button, PageHeader, PageHeaderDetails, PageHeaderHeading, PageHeaderParagraph, Form, FormControl, Label } from '@twilio-paste/core';
import { ArrowForwardIcon } from '@twilio-paste/icons/esm/ArrowForwardIcon';
import { TabPanel } from '@twilio-paste/core/tabs';
import { Box } from '@twilio-paste/core/box';

function FollowUpTabPanel () {
    return (
        <>
            <TabPanel element="MAIN_TAB_PANEL">
                <Box>
                    <Box paddingBottom="space160">
                        <PageHeader>
                        <PageHeaderDetails>
                            <PageHeaderHeading>Follow-Up</PageHeaderHeading>
                            <PageHeaderParagraph>
                            Forneça os dados para o próximo follow-up.
                            </PageHeaderParagraph>
                        </PageHeaderDetails>
                        </PageHeader>
                        <Box display="flex" flexDirection="column" rowGap="space130">
                        <Box>
                            <Form>
                                <FormControl>
                                    <Label htmlFor='follow-up-date-picker' required>
                                        Qual será a data do Follow-up?
                                    </Label>
                                    <DatePicker required id='follow-up-date-picker' aria-describedby='follow-up-help-text' />
                                    <HelpText id='follow-up-help-text'>
                                        Selecione a data.
                                    </HelpText>
                                </FormControl>
                                <FormControl>
                                    <Label htmlFor='follow-up-time-picker' required>
                                    Qual será o horário do Follow-up?
                                    </Label>
                                    <TimePicker required id='follow-up-time-picker' aria-describedby='follow-up-time-help-text' />
                                    <HelpText id='follow-up-time-help-text'>Selecione o Horário.</HelpText>
                                </FormControl>
                            </Form>
                        </Box>
                        <Box display="flex" justifyContent="end">
                            <Button variant="primary">
                                Salvar <ArrowForwardIcon decorative />
                            </Button>
                        </Box>
                    </Box>
                </Box>
                </Box>
            </TabPanel>
        </>
    );
};

export default FollowUpTabPanel;