/**
 * config ther ioc container
 * use typescript-ioc
 * sample :
 *    import { ContainerConfig } from "typescript-ioc/container-config";
 *    ContainerConfig.addSource('lib/*')
 */

import { ContainerConfig } from "typescript-ioc/container-config";

ContainerConfig.addSource("@/*");
