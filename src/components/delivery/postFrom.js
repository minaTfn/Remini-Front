import React from "react";
import {TextField, Box, Paper, Grid} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";
import 'moment-timezone';

const useStyle = makeStyles(theme => ({
    root: {
        flexGrow: 1,
    },
    button: {
        background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
        borderRadius: 3,
        border: 0,
        color: 'white',
        height: 48,
        padding: '0 30px',
        boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    },
}));



const PostForm = (props) => {
    const classes = useStyle();

    return (
        <div className={classes.root}>
            <Paper elevation={2} square>
                <Box component="p" p={2} m={1}>Create New Post</Box>
                <Box component="div" p={3} m={1}>
                    <form onSubmit={props.onSubmit}>
                        <Grid container justify="space-around" spacing={4}>
                            <Grid item sm={12}>
                                <TextField required label="Title" name="title"
                                           onChange={props.onChange}
                                           value={props.states.title}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField required label="Content" multiline  name="content"
                                    onChange={props.onChange}
                                           value={props.states.content}
                                />
                            </Grid>
                            <Grid item sm={12}>
                                <TextField required label="Publish Date" type="datetime-local"  name="publish_date"
                                           onChange={props.onChange}
                                           value={props.states.publish_date}
                                           InputLabelProps={{shrink: true,}}/>
                            </Grid>
                            <Grid item sm={12}>
                                <input type="submit" value="Submit" className={classes.button}/>
                            </Grid>
                        </Grid>
                    </form>
                </Box>
            </Paper>
        </div>
    )
}

export default PostForm;