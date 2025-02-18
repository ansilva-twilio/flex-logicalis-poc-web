import { useState } from 'react';

import { Paragraph } from '@twilio-paste/core/paragraph';
import { Box } from '@twilio-paste/core/box';
import { Label, Grid, Column, HelpText, Card, TextArea, Button, Checkbox, Stack } from '@twilio-paste/core';
import { Heading } from '@twilio-paste/core/heading';

function WorkNotes (props) {
    const [isComment, setIsComment] = useState(false);

    return (
        <>
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
            { props.data && props.data.length > 0 && 
                <>
                    <Box maxWidth="size80">
                        <Paragraph>
                            Abaixo estão as notas de trabalho (amarelas - não visíveis ao cliente) e comentários (brancas - visíveis ao cliente).
                        </Paragraph>
                    </Box>
                    { 
                        props.data?.map((item, index) => {
                            return (
                                <div key={ "work-notes-" + index }>
                                    <Box>
                                        <Card element={ item.element === 'work_notes' ? 'YELLOW_NOTE_CARD' : 'WHITE_NOTE_CARD' }>
                                            <Paragraph>
                                                { item.value }
                                            </Paragraph>
                                            <Paragraph marginBottom="space0">
                                                — { item.sys_created_by } - { item.sys_created_on }.
                                            </Paragraph>
                                        </Card>
                                    </Box>
                                    <br />
                                </div>
                            );
                        }) 
                    }
                </>
            }
        </>
    );
}

export default WorkNotes;