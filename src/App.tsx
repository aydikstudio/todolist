import * as React from 'react'
import './App.scss'
import { addNewObj, getStatus, IList } from './utils';


function App() {

  const [show, setShow] = React.useState<boolean>(true);
  const [input, setInput] = React.useState<string>('');
  const [list, setList] = React.useState<IList[]>([]);
  const [footer_active_button, setFooterActiveButton] = React.useState<string>('all');
  const inputRef = React.useRef<any>('');



  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {

      if (input.length > 0) {
        let list_obj = addNewObj(input);


        setList([list_obj, ...list])
        setInput('')
      }


    }
  }

  const onChangeStatus = (id: number) => {

    let updatedList = list.map(item => {
      if (item.id == id) {

        let status_new = getStatus(item.status);
        
        return { ...item, status: status_new };
      }
      return item;
    });


    setList(updatedList);
  }


  const clearCompleted = () => {




    setList(list.filter((item) => item.status == 'active'));
  }



  return (
    <>
      <div className="todos">
        <div>
          <h1>todos</h1>
        </div>
        <div className="todos_block">
          <div className="todos-input">
            <div className="todos-input-action">
              {show ? <i className="fa fa-arrow-down" aria-hidden="true" onClick={() => setShow(false)}></i> : <i className="fa fa-arrow-up" aria-hidden="true" onClick={() => setShow(true)} ></i>}
            </div>

            <input placeholder="Whats needs to be done?" value={input} className="todos-input-input" onKeyDown={(e) => onKeyDown(e)} ref={inputRef}  onChange={(e) =>  setInput(e.target.value)} />
          </div>
          <div className="todos_list">

            {show ? list.length > 0 ? list.filter((item) => {
              if (footer_active_button == 'active') {
                if (item.status == 'active') {
                  return item;
                }
              } else if (footer_active_button == 'completed') {
                if (item.status == 'completed') {
                  return item;
                }
              } if (footer_active_button == 'all') {
                return item;
              }
            }).map((item) => {
              return (
                <div key={item.id} className="todos_item">

                  <div className="todos-input-action">
                    {item.status == 'active' ? <i className="fa fa-minus-circle" aria-hidden="true" onClick={() => onChangeStatus(item.id)}></i> : <i className="fa fa-check-circle" aria-hidden="true" onClick={() => onChangeStatus(item.id)}></i>}
                  </div>
                  <div className="todos-text" style={item.status == 'completed' ? { textDecoration: 'line-through', color: '#cbcbcb' } : {}}>
                    {item.title}
                  </div>
                </div>

              )
            }) : <div className='not-tasks'>Нет задач</div> : ''}
          </div>
          <div className="todos-footer">
            <div>
              {list.filter((item) => item.status == 'active').length} items left
            </div>
            <div className="footer-actions">
              <div className={`${footer_active_button == 'all' ? 'active' : ''}`} onClick={() => setFooterActiveButton('all')}>
                all
              </div>
              <div className={`${footer_active_button == 'active' ? 'active' : ''}`} onClick={() => setFooterActiveButton('active')}>
                active
              </div>
              <div className={`${footer_active_button == 'completed' ? 'active' : ''}`} onClick={() => setFooterActiveButton('completed')}>
                completed
              </div>
            </div>
            <div className="clear" onClick={() => clearCompleted()}>
              clear completed
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
