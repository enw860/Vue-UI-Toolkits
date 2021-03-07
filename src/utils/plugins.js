/**
 * Plugin object factory function.
 * @param {object} { components, plugins }
 * @returns {object} plugin install object
 */
export const pluginFactory = ({ components, plugins } = {}) => {
    return function (Vue) {
        if (!this.installed) {
            this.installed = true
            registerComponents(Vue, components)
            registerPlugins(Vue, plugins)
        }
    }
}

/**
 * Load a group of vue components.
 * @param {object} Vue Vue object
 * @param {object} components An array of vue components
 */
export const registerComponents = (Vue, components = []) => {
    components.forEach(component => {
        const name = component.controlName || component.name;
        if (Vue && name && component) {
            Vue.component(Vue, name, component);
        } else {
            console.error(`Somthing wrong while registing the component ${component}`);
        }
    })
}

/**
 * Load a group of vue plugins.
 * @param {object} Vue Vue object
 * @param {object} Plugin An array of vue plugins
 */
export const registerPlugins = (Vue, plugins = []) => {
    plugins.forEach(plugin => {
        if (plugin && Vue) {
            Vue.use(plugin);
        }
    })
}
