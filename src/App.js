import { useState, useEffect } from 'react';
import { isEmpty } from 'lodash';
import axios from 'axios';  

import { useUID } from '@twilio-paste/core/dist/uid-library';
import { CustomizationProvider } from '@twilio-paste/core/dist/customization';
import { Stack, SkeletonLoader } from '@twilio-paste/core';
import { Box } from '@twilio-paste/core/box';
import { Tabs, TabList, Tab, TabPanels } from '@twilio-paste/core/tabs';

import Header from './components/Header';
import IncidentDetailsTabPanel from './components/IncidentDetailsTabPanel';
import RequestItemDetailsTabPanel from './components/RequestItemDetailsTabPanel';
import TaskDetailsTabPanel from './components/TaskDetailsTabPanel';
import FollowUpTabPanel from './components/FollowUpTabPanel';
import KnowledgeBaseTabPanel from './components/KnowledgeBaseTabPanel';
import NotFound from './components/NotFound';
import Unauthorized from './components/Unauthorized';
import { customPasteElements } from './assets/CustomPasteElements';
import './App.css';

function App() {
  const [token, setToken] = useState('');
  const [loaded, setLoaded] = useState(false);
  const [data, setData] = useState({});
  const [noData, setNoData] = useState(false);
  const [unauthorized, setUnauthorized] = useState(false);
  const [incident, setIncident] = useState(undefined);
  const [requestItem, setRequestItem] = useState(undefined);
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
        let config = {
          method: 'post',
          url: `${process.env.REACT_APP_SERVER_URL}/getIncident`,
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 
          },
          data: {
            Token: token,
            number: incident
          }
        };
        axios.request(config)
          .then((response) => { 
            setData(response.data.data); 
          })
          .catch((_err) => { 
            console.log('Incident not found'); 
          })
          .finally(async () => {
            setLoaded(true); 
          });
      } else if (requestItem && requestItem !== "") {
        let config = {
          method: 'post',
          url: `${process.env.REACT_APP_SERVER_URL}/getRequestItem`,
          headers: { 
            'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8', 
          },
          data: {
            Token: token,
            number: requestItem
          }
        };

        axios.request(config)
          .then((response) => { 
            setData(response.data.data); 
          })
          .catch((_err) => { 
            console.log('Request Item not found'); 
          })
          .finally(() => {
            setLoaded(true); 
          });
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
                      { incident && <Tab id={selectedId}>{ data.number }</Tab> }
                      { requestItem && 
                        <>
                          <Tab id={selectedId}>{ data.number }</Tab>
                          { 
                            data.tasks?.map((item, index) => { return (
                              <Tab key={ "sc-task-" + index}>{ data.tasks[index].number }</Tab>);
                            })
                          }
                        </> 
                      }
                      <Tab>Follow Up</Tab>
                      <Tab>Base de Conhecimento</Tab>
                  </TabList>
                  <TabPanels>
                      { incident && <IncidentDetailsTabPanel data={data} /> }
                      { requestItem && 
                          <>
                            <RequestItemDetailsTabPanel data={data} />
                            { 
                              data.tasks?.map((item, index) => { return (
                                <TaskDetailsTabPanel key={ "task-detail" + index} data={ data.tasks[index] } />);
                              })
                            }
                          </> 
                      }
                      
                      <FollowUpTabPanel data={data} />
                      <KnowledgeBaseTabPanel data={data} />
                  </TabPanels>
              </Tabs>
              </Box>
            ) : ( 
              <Box padding="space60">
                <Stack orientation="vertical" spacing="space20">
                  <SkeletonLoader />
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
