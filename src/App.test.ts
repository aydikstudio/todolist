import {describe, it, expect, expectTypeOf} from "vitest";
import { addNewObj, getStatus, IList } from "./utils";

describe.concurrent('tests', () => {
    it('test getstatus', () => {
        let status = getStatus('active')
        expect(status).toEqual('completed')

        let status1 = getStatus('completed')
        expect(status1).toEqual('active')
    })

    it('check types new item', () => {
        let obj = addNewObj('wash car');
        expectTypeOf(obj).toEqualTypeOf<IList>()
    })
})