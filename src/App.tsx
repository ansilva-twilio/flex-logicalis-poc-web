import * as React from 'react';
import { useState, useEffect } from 'react';

import { useUID } from '@twilio-paste/core/dist/uid-library';
import { CustomizationProvider } from '@twilio-paste/core/dist/customization';
import { Stack, SkeletonLoader } from '@twilio-paste/core';
import { Box } from '@twilio-paste/core/box';
import { Tabs, TabList, Tab, TabPanels } from '@twilio-paste/core/tabs';
import { Header } from './components/Header';
import { IncidentDetailsTabPanel } from './components/IncidentDetailsTabPanel';
import { RequestItemDetailsTabPanel } from './components/RequestItemDetailsTabPanel';
import { TaskDetailsTabPanel } from './components/TaskDetailsTabPanel';
import { FollowUpTabPanel } from './components/FollowUpTabPanel';
import { KnowledgeBaseTabPanel } from './components/KnowledgeBaseTabPanel';
import { NotFound } from './components/NotFound';
import { Unauthorized } from './components/Unauthorized';
import { customPasteElements } from './assets/CustomPasteElements';

import './App.css';
import { ServiceNowService } from './services/ServiceNowService';

const isEmpty = (value: any): boolean => {
  if (value == null) return true; // Checks for null or undefined
  if (typeof value === "string" || Array.isArray(value)) return value.length === 0;
  if (typeof value === "object") return Object.keys(value).length === 0;
  return false; // Numbers, booleans, and functions are not "empty"
};

const App: React.FC = () => {
  const [token, setToken] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState<any>({});
  const [noData, setNoData] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [incident, setIncident] = useState('');
  const [requestItem, setRequestItem] = useState('');
  const [tasks, setTasks] = useState<any[]>([]);
  const selectedId = useUID();

  useEffect(() => {
    const params = Object.fromEntries(new URLSearchParams(window.location.search));
    if (params.token) { 
      setToken(params.token); 
      if (params.incident && params.incident !== "") {
        setIncident(params.incident);
      } else if (params.requestItem && params.requestItem !== "") {
        setRequestItem(params.requestItem);
      } else {
        setNoData(true);
      }
    } else {
      setUnauthorized(true);
    }
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (token) {
      if (incident && incident !== "") {
        ServiceNowService.getIncident(incident)
          .then((response) => { 
            setData(response); 
          })
          .catch((_err) => { 
            console.error('Incident not found', _err); 
          })
          .finally(() => {
            setLoaded(true); 
          });
      } else if (requestItem && requestItem !== "") {
        ServiceNowService.getRequestItem(requestItem)
          .then((response) => { 
            setData(response); 
            const requestId = (response as any)?.sys_id;
            ServiceNowService.getTasks(requestId)
              .then((taskResponse) => {
                const tasks: any[] = [];
                taskResponse?.data?.forEach((task: any) => {
                  tasks.push(task);
                });
                setTasks(tasks);
              })
              .finally(() => {
                setLoaded(true); 
              });
          })
          .catch((_err) => { 
            console.error('Request Item not found', _err); 
          })
          
      }
    } 
  }, [incident, requestItem, token]);

  document.body.style.height = "100vh";
  document.body.style.overflowY = 'visible';

  return ( 
    <CustomizationProvider baseTheme="default" elements={customPasteElements}>
      <Box padding="space60" className="container">
        { unauthorized &&
          <>
            <Header />
            <Box style={{ padding: '1.25rem'}}>
              <Unauthorized />
            </Box>
          </>
        }
        { !unauthorized && !noData && !isEmpty(data) &&
          <>
            <Header />
            { loaded ? (
              <Box style={{ padding: '1.25rem'}}>
                <Tabs selectedId={selectedId} baseId="horizontal-tabs-example">
                  <TabList aria-label="Horizontal product tabs">
                      { incident && <Tab id={selectedId}>{data?.number}</Tab> }
                      { requestItem && <Tab id={selectedId}>{data?.number}</Tab> }
                      { tasks && tasks.map((item: any, index: number) => { 
                          return (<Tab key={ "task-tab-" + index}>{ item?.number }</Tab>);
                        }) 
                      }
                      <Tab>Follow Up</Tab>
                      <Tab>Base de Conhecimento</Tab>
                  </TabList>
                  <TabPanels>
                      { incident && <IncidentDetailsTabPanel data={data} /> }
                      { requestItem && <RequestItemDetailsTabPanel data={data} /> }
                      { tasks && tasks.map((item: any, index: number) => { 
                          return (<TaskDetailsTabPanel key={ "task-tab-panel" + index} data={item} />);
                        }) 
                      }
                      <FollowUpTabPanel token={token} />
                      <KnowledgeBaseTabPanel token={token} />
                  </TabPanels>
              </Tabs>
              </Box>
            ) : ( 
              <Box padding="space60">
                <Stack orientation="vertical" spacing="space20">
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader />
                  <SkeletonLoader width="50%" />
                </Stack>
              </Box>
            )}
          </>
        }
        { !unauthorized && !noData && isEmpty(data) && loaded &&
          <>
            <Header />
            <Box style={{ padding: '1.25rem'}}>
              <NotFound />
            </Box>
          </>
        }
        { !unauthorized && noData && 
          <img className="main-logo" src='https://media.licdn.com/dms/image/v2/D4D0BAQEKouGjmZSn5A/company-logo_200_200/company-logo_200_200/0/1733173438644/logicalisbr_logo?e=1743033600&v=beta&t=gqZvE7o5VjklmevstBkuAuWtCyd629AO7jMG99uUf_g' alt='logo' />
        }
      </Box>
    </CustomizationProvider>
  );
}

export default App;