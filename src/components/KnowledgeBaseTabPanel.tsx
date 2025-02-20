import { useState, useEffect, useRef, useCallback } from 'react';
import * as React from 'react';

import { ArtificialIntelligenceIcon } from '@twilio-paste/icons/esm/ArtificialIntelligenceIcon';
import { SendIcon } from '@twilio-paste/icons/esm/SendIcon';
import { LockIcon } from '@twilio-paste/icons/esm/LockIcon';
import { PaymentIcon } from '@twilio-paste/icons/esm/PaymentIcon';
import { CalendarIcon } from '@twilio-paste/icons/esm/CalendarIcon';
import { TaskIcon } from '@twilio-paste/icons/esm/TaskIcon';
import { CreditCardIcon } from '@twilio-paste/icons/esm/CreditCardIcon';
import { ChatComposerContainer, ChatComposer, ChatComposerActionGroup } from '@twilio-paste/core/chat-composer';
import { useAIChatLogger, AIChatMessage, AIChatMessageAuthor, AIChatMessageBody, AIChatLogger  } from '@twilio-paste/ai-chat-log';
import { EditorState, LexicalEditor } from '@twilio-paste/lexical-library';
import { 
    $getRoot,
    CLEAR_EDITOR_COMMAND,
    COMMAND_PRIORITY_HIGH,
    ClearEditorPlugin,
    KEY_ENTER_COMMAND,
    useLexicalComposerContext,
} from '@twilio-paste/lexical-library';
import { Button, ButtonGroup, SkeletonLoader } from '@twilio-paste/core';
import { TabPanel } from '@twilio-paste/core/tabs';
import { Heading } from '@twilio-paste/core/heading';
import { Box } from '@twilio-paste/core/box';
import { uid } from '@twilio-paste/core/dist/uid-library';

const EnterKeySubmitPlugin = ({ onKeyDown }: { onKeyDown: () => void }): null => {
    const [editor] = useLexicalComposerContext();

    const handleEnterKey = useCallback(
      (event: KeyboardEvent) => {
        const { shiftKey, ctrlKey } = event;
        if (shiftKey || ctrlKey) return false;
        event.preventDefault();
        event.stopPropagation();
        onKeyDown();
        editor.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
        return true;
      },
      [editor, onKeyDown],
    );
  
    useEffect(() => {
      return editor.registerCommand(KEY_ENTER_COMMAND, handleEnterKey, COMMAND_PRIORITY_HIGH);
    }, [editor, handleEnterKey]);
    return null;
};

export const KnowledgeBaseTabPanel = (): React.ReactElement => {
    const [activeChat, setActiveChat] = useState(false);
    const [message, setMessage] = useState("");
    const [mounted, setMounted] = useState(false);
    const [loading, setLoading] = useState(false);
    const loggerRef = useRef(null);
    const scrollerRef = useRef(null);

    const { aiChats, push, pop } = useAIChatLogger();

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!mounted || !loggerRef.current) return;
        const scrollPosition: any = scrollerRef.current;
        const scrollHeight: any = loggerRef.current;
        scrollPosition?.scrollTo({ top: scrollHeight.scrollHeight, behavior: "smooth" });
    }, [aiChats, mounted]);

    const handleComposerChange = (editorState: EditorState): void => {
        editorState.read(() => {
          const text = $getRoot().getTextContent();
          setMessage(text);
        });
      };

    const submitMessage = (): void => {
        if (message === "" || loading) return;
        if (!activeChat) setActiveChat(true);
        push({
            variant: "user",
            content: (
            <AIChatMessage variant="user">
                <AIChatMessageAuthor aria-label='Agente disse'>Agente</AIChatMessageAuthor>
                <AIChatMessageBody>{ message }</AIChatMessageBody>
            </AIChatMessage>
            ),
        });
        sendMessageToAI(message);
    };

    const sendMessageToAI = (message: string) => {
        // TODO: Send to AI
        // Something like axios.post('https://ai.logicalis.la.com/', message);

        const loadingChatContent = (
            <AIChatMessage variant="bot">
                <AIChatMessageAuthor aria-label="AI said">Logicalis Bot</AIChatMessageAuthor>
                <AIChatMessageBody>
                    <SkeletonLoader width="120px" />
                </AIChatMessageBody>
            </AIChatMessage>
            );

        const loadingChatID = uid(loadingChatContent);
        setLoading(true);

        push({
            id: loadingChatID,
            variant: 'bot',
            content: loadingChatContent,
        });
        setTimeout(() => {
            pop(loadingChatID);
            setLoading(false);
            setTimeout(() => {
                push({
                    variant: 'bot',
                    content: (
                        <AIChatMessage variant="bot">
                            <AIChatMessageAuthor aria-label="Logicalis Bot said">Logicalis Bot</AIChatMessageAuthor>
                            <AIChatMessageBody>
                                Resposta da IA
                            </AIChatMessageBody>
                        </AIChatMessage>
                    ),
                });
                
            }, 500);
        }, 1000);
        
    };

    // eslint-disable-next-line
    const editorInstanceRef = useRef<LexicalEditor>(null);

    return (
        <>
            <TabPanel id='baseConhecimento' element="MAIN_TAB_PANEL">
                <Box>
                    <Box display="flex" flexDirection="column" alignItems="center" rowGap="space40" width="100%" padding="space130">
                        { !activeChat && 
                            <>
                                <ArtificialIntelligenceIcon decorative size="sizeIcon100" />
                                <Heading as="h6" variant="heading10">Como posso te ajudar?</Heading>
                            </>
                        }
                        <Box width="100%">
                            { activeChat &&
                                <Box ref={scrollerRef} overflowX="hidden" overflowY="auto" maxHeight="size50" tabIndex={0}>
                                    <AIChatLogger ref={loggerRef} aiChats={aiChats} />
                                </Box>
                            }
                            <ChatComposerContainer variant="contained">
                                <ChatComposer
                                    ariaLabel="Caixa de texto para dúvidas"
                                    placeholder="Digite aqui a sua dúvida"
                                    editorInstanceRef={editorInstanceRef}
                                    onChange={handleComposerChange}
                                    config={{
                                        namespace: "agent-kb-chat",
                                        onError: (e) => {
                                            throw e;
                                        },
                                    }}>
                                    <ClearEditorPlugin />
                                    <EnterKeySubmitPlugin onKeyDown={submitMessage} />
                                </ChatComposer>
                                <ChatComposerActionGroup>
                                    <Button variant="primary_icon" size="reset" disabled={loading}>
                                        <SendIcon decorative={false} title="Enviar mensagem" onClick={() => {
                                            submitMessage();
                                            editorInstanceRef.current?.dispatchCommand(CLEAR_EDITOR_COMMAND, undefined);
                                            }} />
                                    </Button>
                                </ChatComposerActionGroup>
                            </ChatComposerContainer>
                        </Box>
                    </Box>
                    { !activeChat && 
                        <ButtonGroup justifyContent="center">
                            <Button variant="secondary" size="rounded_small"><CreditCardIcon decorative />O mouse/teclado não responde.</Button>
                            <Button variant="secondary" size="rounded_small"><LockIcon decorative />O acesso remoto (VPN) não está funcionando.</Button>
                            <Button variant="secondary" size="rounded_small"><PaymentIcon decorative />Não consigo acessar a internet. O que fazer?</Button>
                            <Button variant="secondary" size="rounded_small"><CalendarIcon decorative />Minha conta foi bloqueada. Como desbloquear?</Button>
                            <Button variant="secondary" size="rounded_small"><TaskIcon decorative />A aplicação corporativa está muito lenta.</Button>
                        </ButtonGroup>
                    }
                </Box>
            </TabPanel>
        </>
    );
};