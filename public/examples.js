// پارامتر اول المان های داخل استور و پارامتر دوم پراپس های کامپوننت کانکت شده
const mapStateToProps = (state, ownProps) => ({
    active: ownProps.filter === state.visibilityFilter
});
///////////////////////////////////////////
// موقع کلیک روی این کامپوننت پراپس های این کامپوننت رو دسترسی داره
const mapDispatchToProps = (dispatch, ownProps) => ({
    onClick: () => dispatch(setVisibilityFilter(ownProps.filter))
})

///////////////////////////////////////////
const getVisibleTodos = (todos, filter) => {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos;
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(t => t.completed);
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(t => !t.completed);
        default:
            throw new Error('Unknown filter: ' + filter)
    }
}


// با استفاده از یک فانکشن مقدار todos رو نسبت به استور تعیین میکنه
const mapStateToProps = state => ({
    todos: getVisibleTodos(state.todos, state.visibilityFilter)
})



// مشابه کد بالا ولی بهینه تر و با reselect

// از همون کتابخانه reselect داره استفاده میکنه
import { createSelector } from '@reduxjs/toolkit'


const selectTodos = state => state.todos
const selectFilter = state => state.visibilityFilter
const selectVisibleTodos = createSelector(
    [selectTodos, selectFilter],
    (todos, filter) => {
        switch (filter) {
            case VisibilityFilters.SHOW_ALL:
                return todos;
            case VisibilityFilters.SHOW_COMPLETED:
                return todos.filter(t => t.completed);
            case VisibilityFilters.SHOW_ACTIVE:
                return todos.filter(t => !t.completed);
            default:
                throw new Error('Unknown filter: ' + filter)
        }
    }
)
const mapStateToProps = state => ({
     todos: selectVisibleTodos(state)
})

/////////////////////////////////////////////

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        // اضافه کردن آیتم به آرایه
        addTodo(state, action) {
            const {id, text} = action.payload
            state.push({id, text, completed: false})
        },
        // تغییر یک آیتم در آرایه
        toggleTodo(state, action) {
            const todo = state.find(todo => todo.id === action.payload)
            if (todo) {
                todo.completed = !todo.completed
            }
        }
    }
})
///////////////////////////////////////////////////
let nextTodoId = 0

const todosSlice = createSlice({
    name: 'todos',
    initialState: [],
    reducers: {
        addTodo: {
            reducer(state, action) {
                const {id, text} = action.payload
                state.push({id, text, completed: false})
            },
            // برای کاستومایز کردن payload اشتفاده شده
            prepare(text) {
                return {payload: {text, id: nextTodoId++}}
            }
        }
    }
}
////////////////////////////////////////////////////
import React, {useState} from 'react'

const [todoText, setTodoText] = useState('')

const onChange = e => setTodoText(e.target.value)

//<input value={todoText} onChange={onChange} />
///////////////////////////////////////////////////

useEffect(() => {
    async function fetchEverything() {
        async function fetchIssues() {
            const issuesResult = await getIssues(org, repo, page)
            setIssues(issuesResult)
        }

        async function fetchIssueCount() {
            const repoDetails = await getRepoDetails(org, repo)
            setNumIssues(repoDetails.open_issues_count)
        }

        try {
            await Promise.all([fetchIssues(), fetchIssueCount()])
            setIssuesError(null)
        } catch (err) {
            console.error(err)
            setIssuesError(err)
        } finally {
            setIsLoading(false)
        }
    }

    setIsLoading(true)

    fetchEverything()
}, [org, repo, page])