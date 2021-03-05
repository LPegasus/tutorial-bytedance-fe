import {
  makeStyles,
  IconButton,
  AppBar as AppBarMui,
  Toolbar,
} from '@material-ui/core';
import {
  CropFreeOutlined,
  MailOutlined,
  SettingsOutlined,
} from '@material-ui/icons';

const useWrapperStyles = makeStyles((theme) => ({
  bar: {
    backgroundColor: theme.palette.background.paper,
  },
  scanIcon: {
    color: theme.palette.grey[600],
  },
  toolbar: {
    display: 'flex',
    justifyContent: 'space-between',
    padding: 0,
  },
}));

export function ToolBar() {
  const classes = useWrapperStyles();
  return (
    <AppBarMui position="fixed" className={classes.bar} variant="outlined">
      <Toolbar variant="dense" className={classes.toolbar}>
        <IconButton
          onClick={() => {
            // TODO: camera
            alert('之后添加摄像头打开功能');
          }}
        >
          <CropFreeOutlined className={classes.scanIcon} />
        </IconButton>
        <div>
          <IconButton>
            <MailOutlined className={classes.scanIcon} />
          </IconButton>
          <IconButton>
            <SettingsOutlined className={classes.scanIcon} />
          </IconButton>
        </div>
      </Toolbar>
    </AppBarMui>
  );
}
