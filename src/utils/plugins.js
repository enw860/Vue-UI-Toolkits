/**
 * Plugin object factory function.
 * @param {object} { components, plugins }
 * @returns {object} plugin install object
 */
export const pluginFactory = ({ components, plugins } = {}) => {
    const install = function (Vue) {
        if (!install.installed) {
            install.installed = true;
            registerComponents(Vue, components);
            registerPlugins(Vue, plugins);
        }
    }

    install.installed = false;
    return install;
}

/**
 * Load a group of vue components.
 * @param {object} Vue Vue object
 * @param {object} components An array of vue components
 */
export const registerComponents = (Vue, components = []) => {
    components.forEach(component => {
        if (component) {
            const name = component.controlName || component.name;

            if (Vue && name) {
                Vue.component(name, component);
            } else {
                console.error(`Somthing wrong while registing the component ${component}`);
            }
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
