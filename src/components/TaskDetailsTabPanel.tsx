import * as React from 'react';
import { useForm } from 'react-hook-form';

import { Paragraph } from '@twilio-paste/core/paragraph';
import { Box } from '@twilio-paste/core/box';
import { PageHeader, PageHeaderDetails, PageHeaderHeading, Form, FormControlTwoColumn  } from '@twilio-paste/core';
import { TabPanel } from '@twilio-paste/core/tabs';
import { Heading } from '@twilio-paste/core/heading';
import { FormField } from './FormField';
import { WorkNotes } from './WorkNotes';

interface TaskFormData {
    number: string;
    company: string;
    caller_id: string;
    u_task_for: string;
    category: string;
    subcategory: string;
    incident_type: string;
    cmdb_ci: string;
    business_service: string;
    u_external_ticket: string;
    u_tracking_flag: string;
    sys_domain: string;
    u_crisis: string;
    time_worked: string;
    short_description: string;
    description: string;
    state: string;
    incident_state: string;
    u_follow_up_with: string;
    impact: number;
    urgency: number;
    priority: string;
    assignment_group: string;
    assigned_to: string;
    opened_at: string;
    opened_by: string;
    contact_type: string;   
    watch_list: string;    
}

const TaskFormFields = [
    {
      "fieldName": "number",
      "label": "Número",
      "required": false,
      "readOnly": true,
      "columns": 1,
      "height": 1,
      "inputType": "text"
    },
    {
      "fieldName": "company",
      "label": "Empresa",
      "required": false,
      "readOnly": true,
      "columns": 1,
      "height": 1,
      "inputType": "text"
    },
    {
      "fieldName": "request.requested_for",
      "label": "Requisitado para",
      "required": false,
      "readOnly": true,
      "columns": 1,
      "height": 1,
      "inputType": "text"
    },
    {
      "fieldName": "cmdb_ci",
      "label": "Item de Configuração",
      "required": false,
      "readOnly": true,
      "columns": 1,
      "height": 1,
      "inputType": "text"
    },
    {
      "fieldName": "cat_item",
      "label": "Item de Catálogo",
      "required": false,
      "readOnly": true,
      "columns": 1,
      "height": 1,
      "inputType": "text"
    },
    {
      "fieldName": "location",
      "label": "Localização",
      "required": false,
      "readOnly": true,
      "columns": 1,
      "height": 1,
      "inputType": "text"
    },
    {
      "fieldName": "u_ci_location",
      "label": "Localização do IC",
      "required": false,
      "readOnly": true,
      "columns": 1,
      "height": 1,
      "inputType": "text"
    },
    {
      "fieldName": "sys_domain",
      "label": "Domínio",
      "required": false,
      "readOnly": true,
      "columns": 1,
      "height": 1,
      "inputType": "text"
    },
    {
      "fieldName": "time_worked",
      "label": "Tempo Trabalhado",
      "required": false,
      "readOnly": true,
      "columns": 1,
      "height": 1,
      "inputType": "text"
    },
    {
      "fieldName": "short_description",
      "label": "Descrição curta",
      "required": false,
      "readOnly": true,
      "columns": 2,
      "height": 1,
      "inputType": "text"
    },
    {
      "fieldName": "description",
      "label": "Descrição",
      "required": false,
      "readOnly": true,
      "columns": 2,
      "height": 2,
      "inputType": "text"
    },
    {
      "fieldName": "state",
      "label": "Estado",
      "required": true,
      "readOnly": false,
      "columns": 1,
      "height": 1,
      "inputType": "combobox",
      "source": "sys_choice",
      "sourceQuery": "language=en^inactive=false^element=state^name=task",
      "sourceFields": "sys_id,label"
    },
    {
      "fieldName": "assignment_group",
      "label": "Grupo Assignado",
      "required": false,
      "readOnly": true,
      "columns": 1,
      "height": 1,
      "inputType": "text"
    },
    {
      "fieldName": "assigned_to",
      "label": "Assignado para",
      "required": false,
      "readOnly": true,
      "columns": 1,
      "height": 1,
      "inputType": "text"
    },
    {
      "fieldName": "opened_at",
      "label": "Aberto em",
      "required": false,
      "readOnly": true,
      "columns": 1,
      "height": 1,
      "inputType": "text"
    },
    {
      "fieldName": "opened_by",
      "label": "Aberto por",
      "required": false,
      "readOnly": true,
      "columns": 1,
      "height": 1,
      "inputType": "text"
    },
    {
      "fieldName": "contact_type",
      "label": "Tipo de Contato",
      "required": false,
      "readOnly": true,
      "columns": 1,
      "height": 1,
      "inputType": "text"
    },
    {
      "fieldName": "watch_list",
      "label": "Lista de Observação",
      "required": false,
      "readOnly": true,
      "columns": 1,
      "height": 1,
      "inputType": "text",
    }
  ];

export const TaskDetailsTabPanel = (props:any): React.ReactElement => {
    const { handleSubmit } = useForm<TaskFormData>();
    const onSubmit = (data: TaskFormData) => {
        console.log('Form submitted:', data);
        // TODO: Implement form submission logic
    };

    const fixServiceNowFieldName = (fieldName: string): string => {
      if (fieldName.includes('.')) {
        const keyParts = fieldName.split('.');
        if (keyParts.length > 2) { 
          return keyParts[2]; 
        }
        return keyParts[1];
      }
      return fieldName;
    }

    const renderFormFields = () => {
        const formFields = [];

        for (let i = 0; i < TaskFormFields.length; i += 2) {
            const field = TaskFormFields[i];

            if (field.columns === 1) {
                const field2 = TaskFormFields[i + 1];
                
                formFields.push(
                    <Box width="100%" key={`form-control-box-task-${i}`}>
                        <FormControlTwoColumn key={`form-control-two-column-task-${i}`}>
                            <FormField
                                key={`form-field-task-${field.fieldName}`}
                                name={field.fieldName}
                                label={field.label}
                                type={field.inputType}
                                required={field.required}
                                readOnly={field.readOnly}
                                initialValue={props.data[fixServiceNowFieldName(field.fieldName)]}
                                snowTable={field.source}
                                snowQuery={field.sourceQuery}
                                snowFields={field.sourceFields}
                            />
                            {field2 && <FormField
                                key={`form-field-task-${field2.fieldName}`}
                                name={field2.fieldName}
                                label={field2.label}
                                type={field2.inputType}
                                required={field2.required}
                                readOnly={field2.readOnly}
                                initialValue={props.data[fixServiceNowFieldName(field2.fieldName)]}
                                snowTable={field2.source}
                                snowQuery={field2.sourceQuery}
                                snowFields={field2.sourceFields}
                            />}
                        </FormControlTwoColumn>
                    </Box>
                );
            } else if (field.columns === 2) {
                
                formFields.push(    
                    <Box width="100%" key={`form-control-box-task-${i}`}>
                        <FormField
                            key={`form-field-task-${field.fieldName}`}
                            name={field.fieldName}
                            label={field.label}
                            type={field.inputType}
                            required={field.required}
                            readOnly={field.readOnly}
                            initialValue={props.data[fixServiceNowFieldName(field.fieldName)]}
                            snowTable={field.source}
                            snowQuery={field.sourceQuery}
                            snowFields={field.sourceFields}
                            height={field.height}  
                        />
                    </Box>
                );
                i = i - 1;
            }
        }
        return <>{formFields}</>;
    };

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
                        <Box display="flex" columnGap="space70" width="100%">
                            <Form onSubmit={handleSubmit(onSubmit)} element="FORM_DETAILS">
                                { renderFormFields() }
                            </Form>
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