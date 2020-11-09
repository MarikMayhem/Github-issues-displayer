import React, { useState } from 'react';
import axios from '../axios-custom';
import Issue from '../components/Issue/Issue';
import Pagination from '../components/UI/Pagination/Pagination';
import Modal from '../components/UI/Modal/Modal';
import Comment from '../components/Comment/Comment';
import Spinner from '../components/UI/Spinner/Spinner'
import './IssueHub.scss'


const IssueHub = () => {
    const [issueState, setIssueState] = useState([])
    const [inputState, setInputState] = useState({
        userName: "",
        repoName: "",
        userNameError: "",
        repoNameError: "",
    })
    const [currentPage, setCurrentPage] = useState(1);
    const [issuesPerPage] = useState(5);
    const [commentData, setCommentData] = useState([])
    const [dataError, setdataError] = useState(false)
    const [displayModal, setDisplayModal] = useState(false);
    const [loading, setLoading] = useState(false);

    const getIssuesHandler = () => {
        setLoading(true)
        axios.get(`repos/${inputState.userName}/${inputState.repoName}/issues`)
            .then(res => {
                setdataError(false)
                setLoading(false)
                return setIssueState(res.data)
            })
            .catch(err => {
                setdataError(true)
                return setIssueState([])
            })
    }

    const closeModalHandler = () => {
        setDisplayModal(false);
    };

    const populateState = (e) => {
        let name = e.target.name;
        let value = e.target.value;
        setInputState(oldState => ({ ...oldState, [name]: value }))
    }

    const getCommentsHandler = (commentsUrl) => {
        setDisplayModal(true)
        setLoading(true)
        axios.get(commentsUrl)
            .then(res => {
                setLoading(false)
                setCommentData(res.data)
            })
    }

    const validateInput = (e) => {
        e.preventDefault()
        let userNameError = "";
        let repoNameError = "";

        if (inputState.userName.length < 1 || inputState.userName.length > 20) {
            userNameError = "Invalid length: min 1, max 20"
        }
        if (inputState.repoName.length < 1 || inputState.repoName.length > 100) {
            repoNameError = "Invalid length: min 1, max 100"
        }
        if (userNameError || repoNameError) {
            setInputState(oldstate => ({ ...oldstate, userNameError, repoNameError }))
            return false
        } else {
            getIssuesHandler()
            setInputState(oldstate => ({ ...oldstate, userNameError, repoNameError }))
        }
    }

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const indexOfLastIssue = currentPage * issuesPerPage;
    const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
    const currentIssues = issueState.slice(indexOfFirstIssue, indexOfLastIssue)

    let comments = !loading ? commentData.map(comment => {
        return <Comment key={comment.id} body={comment.body} user={comment.user} createdAt={comment.created_at} />
    }) : <Spinner />

    return (
        <main>
            <section className="intro">
                <div className="intro-heading">
                    <h1>Welcome to Github Issues Displayer</h1>
                    <h2>To display an issue, simply enter github <span>username and reponame</span></h2>
                </div>
                <form onSubmit={validateInput} action="submit" >
                    <input type="text" name="userName" value={inputState.userName} placeholder="Input name" className="form-input" onChange={populateState} />
                    <div className="input-error">{inputState.userNameError}</div>
                    <input type="text" name="repoName" value={inputState.repoName} placeholder="Repo name" className="form-input" onChange={populateState} />
                    <div className="input-error">{inputState.repoNameError}</div>
                    <button type="submit" >Submit</button>
                </form>
            </section>

            <Modal show={displayModal} modalClosed={closeModalHandler} commentData={commentData}>
                <section className="comment-section">
                    <h2 >Comments:</h2>
                    {commentData.length ? comments : <p className="error">No comments</p>}
                </section>
            </Modal>
            {
                loading && !displayModal && !dataError
                    ? <Spinner />
                    : !dataError ? currentIssues.map(issue => {
                        return <Issue
                            key={issue.id}
                            title={issue.title}
                            assignee={issue.assignee}
                            state={issue.state}
                            showComments={() => getCommentsHandler(issue.comments_url)} />
                    })
                        : <p className="error">Invalid Username or Reponame</p>
            }
            <Pagination issuesPerPage={issuesPerPage} totalIssues={issueState.length} paginate={paginate} />
        </main>
    );
}
export default IssueHub;

