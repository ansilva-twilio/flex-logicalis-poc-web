import * as React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Label, Input, Combobox, TextArea, FormControl, HelpText, Box, Text, Spinner, Stack } from '@twilio-paste/core';
import { MultiselectCombobox, UseComboboxStateChange } from '@twilio-paste/combobox';

import { ServiceNowService } from '../services/ServiceNowService';

interface FormFieldProps {
    name: string;
    label: string;
    type: string;
    required?: boolean;
    readOnly?: boolean;
    initialValue?: any;
    onValueChange?: (value: any) => void;
    error?: string;
    helpText?: string;
    snowTable?: string;
    snowQuery?: string;
    snowFields?: string;  
    height?: number;
}

export const FormField: React.FC<FormFieldProps> = ({
    name,
    label,
    type,
    required = false,
    readOnly = false,
    initialValue,
    onValueChange,
    error,
    helpText,
    snowTable,
    snowQuery,
    snowFields,
    height
}) => {    
    // Query for cached data if cacheKey is provided
    const { data: cachedData } = useQuery({
        queryKey: [name, snowTable, snowQuery, snowFields],
        queryFn: async () => {
            if (name && snowTable && snowQuery && snowFields) {
                try {
                    setLoading(true);
                    const response = await ServiceNowService.getTableData(snowTable, snowQuery, snowFields);
                    let finalData = response.data;
                    if (snowFields.indexOf(',') !== -1 && !snowFields.split(',').includes('name')) {
                        finalData = response.data.map((item: any) => ({ 
                            sys_id: item.sys_id,
                            name: item.label
                        }));
                    }
                    setInputItems(finalData);
                    return finalData;
                } catch (error) {
                    console.error('Error fetching data:', snowTable, snowQuery, snowFields, error);
                    return '';
                } finally {
                    setLoading(false);
                }
            }
            return '';
        },
        enabled: true
    });
    const [loading, setLoading] = React.useState(false);
    const [inputItems, setInputItems] = React.useState(cachedData);
    const [inputMultiSelectValue, setInputMultiSelectValue] = React.useState('');
    const filteredMultiSelectItems = React.useMemo(() => getFilteredItems(inputMultiSelectValue), [inputMultiSelectValue]);

    const handleChange = (value: any) => {
        if (onValueChange) {
            onValueChange(value);
        }
    };

    function getFilteredItems(inputValue: string) {
        if (type === 'multiselect') {
            const lowerCasedInputValue = inputValue?.toLowerCase();
            const items = Array.isArray(cachedData) ? cachedData as Array<any> : [];
            return items.filter(function filterItems(item: any) {
                if (item) {
                    return item?.name?.toLowerCase().includes(lowerCasedInputValue);
                }
                return false;
            });
        }
        return [];
    }

    const multiselectEmptyState = () => (
    <Box paddingY="space40" paddingX="space50">
        <Text as="span" fontStyle="italic" color="colorTextWeak">
        Nenhum resultado encontrado
        </Text>
    </Box>
    );

    const renderField = () => {
        
        switch (type) {
            case 'combobox':
                const selectedItem = Array.isArray(cachedData) ? cachedData?.find((item: any) => item?.name?.replace('  ', ' ').toLowerCase().trim() === initialValue?.replace('  ', ' ').toLowerCase().trim()) : undefined;
                return (
                    <Combobox   
                        name={name}
                        autocomplete={true}
                        selectedItem={selectedItem}
                        itemToString={(item: any) => item.name}
                        optionTemplate={(item: any) => <div>{ item.name }</div>}
                        labelText={label}
                        required={required}
                        readOnly={readOnly}
                        items={inputItems ?? []}
                        onInputValueChange={({inputValue}) => {
                            if (inputValue !== undefined) {
                                const items = Array.isArray(cachedData) ? cachedData as Array<any> : [];
                                setInputItems(items.filter((item: any) => item?.name?.toLowerCase().startsWith(inputValue?.toLowerCase())));
                            }
                        }}
                        onSelectedItemChange={(changes: UseComboboxStateChange<any>) => {
                            if (changes.selectedItem) {
                                handleChange(changes.selectedItem);
                            }
                        }}
                    />
                );
            case 'multiselect':
                const initialSelectedItems = initialValue?.split(',').map((item: any) => ({ name: item }));
                return (
                    <MultiselectCombobox
                        readOnly={readOnly}
                        labelText={label}   
                        selectedItemsLabelText="Selecionados"
                        items={filteredMultiSelectItems}
                        initialSelectedItems={initialSelectedItems}
                        emptyState={multiselectEmptyState}
                        itemToString={(item) => (item ? item.name : '')}
                        optionTemplate={(obj) => (
                            <Box as="span" display="flex" flexDirection="column">
                                <Box as="span">{obj.name}</Box>
                            </Box>
                        )}
                        onInputValueChange={({inputValue: newInputValue = ''}) => {
                            setInputMultiSelectValue(newInputValue);
                        }}
                        onSelectedItemsChange={(selectedItems) => {
                            if (selectedItems) {
                                handleChange(selectedItems);
                            }
                        }}
                        />
                );
            case 'textarea':
                return (
                    <TextArea
                        id={name}
                        name={name}
                        value={initialValue || ''}
                        readOnly={readOnly}
                        onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(e.target.value)}
                        required={required}
                        rows={height}
                    />
                );
            default:
                return (
                    <Input
                        id={name}
                        name={name}
                        type="text"
                        value={initialValue || ''}
                        readOnly={readOnly}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleChange(e.target.value)}
                        required={required} 
                    />
                );
        }
    };

    return (
        <FormControl>
            { type !== 'combobox' && type !== 'multiselect' && 
                <Label htmlFor={name} required={required}>
                    {label}
                </Label> 
            }
            {loading ? 
                (
                    <Box width="100%" height="100%">
                        <Label htmlFor={name} required={required}>
                            {label}
                        </Label> 
                        <Stack orientation="horizontal" spacing="space30" element='LOADING_FIELD'>
                            <Spinner decorative={false} title="Loading" /> 
                            <Text as="span" element='LOADING_TEXT'>Carregando dados...</Text>
                        </Stack>
                    </Box>
                ) : renderField()} 
            {error && <HelpText variant="error">{error}</HelpText>}
            {helpText && <HelpText>{helpText}</HelpText>}
        </FormControl>
    );
}; 