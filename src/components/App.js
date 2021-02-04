import React,{useState,useEffect} from 'react'
import Container from 'react-bootstrap/Container'
import Table from 'react-bootstrap/Table'
import Alert from 'react-bootstrap/Alert'
import LogItem from './LogItem'
import AddLogItem from './AddLogItem'
import {ipcRenderer} from 'electron'
const App = () => {
	const [alert,setAlert]=useState({
		show:false,
		message:'',
		variant:'success'
	})
	const [logs,setLogs]=useState([])

	function addItem(item){
		if(item.text ==='' || item.user==='' || item.priority===''){
			showAlert('please enter all the field','danger')
			return false
		}
		// item._id=Math.floor(Math.random() *9000) +1000,
		// item.created=new Date().toString(),
		// setLogs([...logs,item])
		ipcRenderer.send('logs:add',item)
		showAlert('Log Added')
	}
useEffect(()=>{
		ipcRenderer.send('logs:load')
		ipcRenderer.on('logs:get',(e,logs)=>{
			setLogs(JSON.parse(logs))
		})
		ipcRenderer.on('logs:clear',()=>{
			setLogs([])
			showAlert('Logs Cleared')
		})
	},[])
	function showAlert(message,variant='success', seconds=3000){
		setAlert({
			show:true,
			message,
			variant
		})
		setTimeout(()=>{
			setAlert({
				show:false,
				message:'',
				variant:'success'
			})
		},seconds)
	}
function deleteItem(_id){
	//setLogs(logs.filter(item=>item._id !==_id))
	ipcRenderer.send('logs:delete',_id)
	showAlert('Log Removed')

}
	return (
		<Container>
			<AddLogItem  addItem={addItem} />
			{alert.show && <Alert variant={alert.variant}>{alert.message}</Alert>}
			
			<Table>
				<thead>
					<tr>
						<th>Priority</th>
						<th>Log Text</th>
						<th>User</th>
						<th>created</th>
						<th></th>
					</tr>
				</thead>
				<tbody>
					{logs.map(log=>(< LogItem key={log._id} log={log} deleteItem={deleteItem}/>))}
				</tbody>
			</Table>
		</Container>
	)
}

export default App
