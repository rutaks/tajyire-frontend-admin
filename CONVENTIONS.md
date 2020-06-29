## Conventions :)

Some helpful conventions to apply (If you can)

### Commenting Convention
For more ref use [this link](https://devhints.io/jsdoc)
#### Class Commenting

```
/**
 * Short description
 * @author author name(s)
 * @since date or version (preferrably date)
 */
 eg:
/**
 * Class Stuff
 * @author Samuel Rutakayile
 * @since 19.03.3030
 */
```

#### Function Commenting

```
/**
 * Description
 * @param {datatype} parameterName - parameter description
 * @return {datatype} return value description
*/
 eg:
/**
 * Convert a string containing two comma-separated numbers into a point.
 * @param {string} numberString - The string containing two comma-separated numbers.
 * @return {Point} A Point object.
*/
```

### Naming Conventions

#### Folder Naming:

- names must be all lowercase and may include dashes (-) eg: `a-long-folder-name`

#### File Naming:

- For Non-Component Files (Camel Case): someLongFileName
- For Component Files (Pascal Case): `SomeLongFileName`

#### Variable Naming:

- For Classes (Pascal Case): `SomeLongFileName`
- For Non-React Functions And variables (Camel Case): `someLongVariableName`
