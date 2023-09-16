import * as React from 'react'
import './App.scss'

interface IList {
  id: number,
  title: string,
  status: string
}

function App() {

  const [show, setShow] = React.useState<boolean>(true);
  const [input, setInput] = React.useState<string>('');
  const [list, setList] = React.useState<IList[]>([]);
  const [footer_active_button, setFooterActiveButton] = React.useState<string>('all');
  const inputRef = React.useRef<any>('');

  const enterInput = (e: React.ChangeEvent<HTMLInputElement>) => {

    let text = e.target.value;

    setInput(text)

  }


  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {

      if (input.length > 0) {
        let list_obj = {
          id: Date.now(),
          title: input,
          status: 'active'
        }


        setList([list_obj, ...list])
        setInput('')
      }


    }
  }

  const onChangeStatus = (id: number) => {

    let updatedList = list.map(item => {
      if (item.id == id) {

        let status_new;
        if (item.status == 'active') {
          status_new = 'completed'
        } else {
          status_new = 'active'
        }
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
              {show ? <i class="fa fa-arrow-down" aria-hidden="true" onClick={(e) => setShow(false)}></i> : <i class="fa fa-arrow-up" aria-hidden="true" onClick={(e) => setShow(true)} ></i>}
            </div>

            <input placeholder="Whats needs to be done?" value={input} className="todos-input-input" onKeyDown={(e) => onKeyDown(e)} ref={inputRef} className="todos-input-input" contenteditable="true" onInput={(e) => enterInput(e)} />
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
                    {item.status == 'active' ? <i class="fa fa-minus-circle" aria-hidden="true" onClick={(e) => onChangeStatus(item.id)}></i> : <i class="fa fa-check-circle" aria-hidden="true" onClick={(e) => onChangeStatus(item.id)}></i>}
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
              <div className={`${footer_active_button == 'all' ? 'active' : ''}`} onClick={(e) => setFooterActiveButton('all')}>
                all
              </div>
              <div className={`${footer_active_button == 'active' ? 'active' : ''}`} onClick={(e) => setFooterActiveButton('active')}>
                active
              </div>
              <div className={`${footer_active_button == 'completed' ? 'active' : ''}`} onClick={(e) => setFooterActiveButton('completed')}>
                completed
              </div>
            </div>
            <div className="clear" onClick={(e) => clearCompleted()}>
              clear completed
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default App
