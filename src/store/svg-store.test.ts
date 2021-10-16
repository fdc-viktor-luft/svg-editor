import rewire from "rewire"
const svg_store = rewire("./svg-store")
const get = svg_store.__get__("get")
const getCurrent = svg_store.__get__("getCurrent")
const setCurrent = svg_store.__get__("setCurrent")
const persist = svg_store.__get__("persist")
const set = svg_store.__get__("set")
// @ponicode
describe("get", () => {
    test("0", () => {
        let callFunction: any = () => {
            get()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("getCurrent", () => {
    test("0", () => {
        let callFunction: any = () => {
            getCurrent()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("setCurrent", () => {
    test("0", () => {
        let callFunction: any = () => {
            setCurrent(1)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            setCurrent(1000)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            setCurrent(10)
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            setCurrent(-Infinity)
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("persist", () => {
    test("0", () => {
        let callFunction: any = () => {
            persist()
        }
    
        expect(callFunction).not.toThrow()
    })
})

// @ponicode
describe("set", () => {
    test("0", () => {
        let callFunction: any = () => {
            set({ name: "Pierre Edouard", path: "C:\\\\path\\to\\folder\\", attr: { width: 432, height: 25, precision: 0.0, fill: false, stroke: { width: 64, linecap: "square", linejoin: "bevel" } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("1", () => {
        let callFunction: any = () => {
            set({ name: "Michael", path: "C:\\\\path\\to\\folder\\", attr: { width: 200, height: 1080, precision: 0.0, fill: true, stroke: { width: 40, linecap: "butt", linejoin: "miter" } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("2", () => {
        let callFunction: any = () => {
            set({ name: "Michael", path: "path/to/file.ext", attr: { width: 800, height: 800, precision: 1, fill: false, stroke: { width: 24000, linecap: "square", linejoin: "bevel" } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("3", () => {
        let callFunction: any = () => {
            set({ name: "Anas", path: "/path/to/file", attr: { width: 8, height: 6, precision: 1, fill: true, stroke: { width: 16, linecap: "butt", linejoin: "miter" } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("4", () => {
        let callFunction: any = () => {
            set({ name: "Michael", path: "C:\\\\path\\to\\folder\\", attr: { width: 80.0, height: 48000, precision: 0, fill: false, stroke: { width: 287, linecap: "butt", linejoin: "bevel" } } })
        }
    
        expect(callFunction).not.toThrow()
    })

    test("5", () => {
        let callFunction: any = () => {
            set({ name: "", path: "", attr: { width: -Infinity, height: -Infinity, precision: -Infinity, fill: true, stroke: { width: -Infinity, linecap: "round", linejoin: "bevel" } } })
        }
    
        expect(callFunction).not.toThrow()
    })
})
