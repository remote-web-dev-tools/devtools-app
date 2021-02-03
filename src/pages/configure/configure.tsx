import { Container, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { Controller, useForm } from 'react-hook-form';

import { ConfigContext } from '@app/App';
import { ConfigureInterface } from '@interfaces/configure.interface';

const useStyles = makeStyles({
  header: {
    display: 'flex',
    marginBottom: 36,
  },
  content: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  form: {
    width: 400,
  },
  buttonItem: {
    display: 'flex',
    marginTop: 24,
    justifyContent: 'flex-end',
  },
});

const Configure = () => {
  const history = useHistory();
  const styles = useStyles();

  const { saveConfigure } = useContext(ConfigContext);
  const { control, handleSubmit, errors: fieldsErrors } = useForm<ConfigureInterface>();

  const onSubmit = (data: ConfigureInterface) => {
    /* TODO: 保存数据 */
    // saveConfigure({});

    history.push('/');
  };

  return (
    <Container>
      <div className={styles.content}>
        <header className={styles.header}>
          <img src={process.env.PUBLIC_URL + '/logo80.png'} alt={'logo'} />
          <h1>Remote web dev tools</h1>
        </header>

        <form autoComplete={'off'} className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name={'transferServerUrl'}
            defaultValue={''}
            as={
              <TextField
                fullWidth
                label={'Transfer Server URL'}
                error={!!fieldsErrors.transferServerUrl}
                helperText={fieldsErrors.transferServerUrl ? 'Host is required' : null}
                placeholder={'Input transfer server url'}
                style={{ marginBottom: 16 }}
              />
            }
            rules={{
              required: true,
            }}
          />

          <Controller
            name={'viewId'}
            control={control}
            defaultValue={''}
            as={
              <TextField fullWidth label={'View Id'} placeholder={'Input your view id'} style={{ marginBottom: 16 }} />
            }
          />

          <div className={styles.buttonItem}>
            <Button variant={'contained'} color={'primary'} type={'submit'}>
              Save
            </Button>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default Configure;
