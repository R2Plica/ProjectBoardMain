import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import ProjectTaskItem from './ProjectTask/ProjectTaskItem';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {getBacklog} from '../actions/projectTaskActions'
class ProjectBoard extends Component {
     componentDidMount() {
         this.props.getBacklog();
     }
    render() {
        const { project_tasks } = this.props.project_tasks;
        let BoardContent;
        let itemsToDo = [];
        let itemsInProgress = [];
        let itemsDone = [];

        const BoardAlgorithm = project_tasks => {
            if (project_tasks.length < 1) {
              return (
                <div className="alert alert-info text-center" role="alert">
                  There are no task to do, add a Project
                </div>
              );
            } else {
              const tasks = project_tasks.map(project_task => (
                <ProjectTaskItem key={project_task.id} project_task={project_task} />
              ));
      
              for (let i = 0; i < tasks.length; i++) {
                if (tasks[i].props.project_task.status === "TO_DO") {
                  itemsToDo.push(tasks[i]);
                }
      
                if (tasks[i].props.project_task.status === "IN_PROGRESS") {
                  itemsInProgress.push(tasks[i]);
                }
      
                if (tasks[i].props.project_task.status === "DONE") {
                  itemsDone.push(tasks[i]);
                }
              }
            return (
                <React.Fragment>
                <div className="container">
                <div className="row">
                    
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-secondary text-white">
                                <h3>TO DO</h3>
                            </div>
                        </div>
                        {itemsToDo}
                    </div>
                   
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-primary text-white">
                                <h3>In Progress</h3>
                            </div>
                        </div>
                        {itemsInProgress}
    
                    </div>
                    <div className="col-md-4">
                        <div className="card text-center mb-2">
                            <div className="card-header bg-success text-white">
                                <h3>Done</h3>
                            </div>
                            
                        </div>
                        {itemsDone}
                    </div>
                  </div>
                 </div>
              </React.Fragment>
              );
            }
          };
      

          BoardContent = BoardAlgorithm(project_tasks);

          return (
            
            <div className="container">
            <Link to="/addProjectTask" className="btn btn-primary mb-3">
                <i> Create Project Task</i>
            </Link>
            <br />
            <hr />
           {BoardContent}
          </div>
        ) 
    }

};
ProjectBoard.propTypes = {
    getBacklog: PropTypes.func.isRequired,
    project_tasks: PropTypes.object.isRequired
  };
  
  const mapStateToProps = state => ({
    project_tasks: state.project_task
  });
  
  export default connect(
    mapStateToProps,
    { getBacklog }
  )(ProjectBoard);