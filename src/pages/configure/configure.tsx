import { Container, makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import React, { useContext, useEffect } from 'react';
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

  const { saveConfigure, configure } = useContext(ConfigContext);
  const { control, handleSubmit, errors: fieldsErrors, setValue } = useForm<
    Pick<ConfigureInterface, 'transferServerUrl'>
  >();

  const onSubmit = (data: Required<ConfigureInterface>) => {
    saveConfigure(data);
    history.push('/');
  };

  useEffect(() => {
    setValue('transferServerUrl', configure.transferServerUrl);
  }, [configure]);

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
                helperText={fieldsErrors.transferServerUrl ? fieldsErrors.transferServerUrl.message : null}
                placeholder={'Input transfer server url'}
                style={{ marginBottom: 16 }}
              />
            }
            rules={{
              required: { value: true, message: 'Must be required' },
              pattern: {
                message: 'Must be an url',
                value: /^((ht|f)tps?:\/\/)?[\w-]+(\.[\w-]+)+(:\d{1,5})?\/?$/,
              },
            }}
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
