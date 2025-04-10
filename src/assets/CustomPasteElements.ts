import { PasteCustomCSS } from '@twilio-paste/customization';

export const customPasteElements = {
  PAGE_HEADER_DETAILS: {
    marginBottom: 'space0'
  },
  YELLOW_NOTE_CARD: {
      padding: 'space50',
      borderLeftWidth: 'borderWidth30',
      borderLeftColor: '#ffcc33',
  },
  WHITE_NOTE_CARD: {
      padding: 'space50',
      borderLeftWidth: 'borderWidth30',
      borderLeftColor: 'rgb(200,200,200)',
  }, 
  MAIN_TAB_PANEL: {
    borderLeft: 'solid 1px #ddd',
    borderRight: 'solid 1px #ddd',
    borderBottom: 'solid 1px #ddd',
    padding: 'space60'
  },
  FORM_DETAILS: {
    width: '100%'
  },
  LOADING_FIELD: {
    height: '36px'
  },
  LOADING_TEXT: {
    fontStyle: 'italic',
    color: '#777'
  }
} as { [key: string]: PasteCustomCSS | any };
