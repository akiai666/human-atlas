export type SystemId = 'skeletal'|'muscular'|'arterial'|'venous'|'nervous'|'digestive'|'respiratory'|'urinary'|'reproductive'|'lymphatic'|'endocrine'|'integumentary'|'connective'|'sensory'|'cardiac';
export const SYSTEMS: {id:SystemId;name:string;color:string;description:string}[] = [
 {id:'skeletal',name:'骨骼',color:'#e2d9ba',description:'骨骼构成人体的支撑框架，保护器官，并为肌肉提供附着点。骨组织还储存矿物质、制造血细胞。'},
 {id:'muscular',name:'肌肉',color:'#a85b50',description:'骨骼肌通过收缩牵拉附着部位产生运动。肌肉与肌腱共同带动关节、维持姿势，并产生热量。'},
 {id:'cardiac',name:'心脏',color:'#b96760',description:'心脏是具有四个腔室的肌性泵。心脏瓣膜引导血液向前流动，完成肺循环和体循环。'},
 {id:'sensory',name:'感觉器官',color:'#b0c8ce',description:'这些结构参与视觉、听觉和平衡等特殊感觉。专门的组织感受刺激，并与神经系统协同传递信息。'},
 {id:'arterial',name:'动脉',color:'#c05245',description:'心脏推动血液循环。动脉将血液输送离开心脏，为组织供血；肺动脉则将血液送往肺部。'},
 {id:'venous',name:'静脉',color:'#527c9f',description:'静脉将血液送回心脏。浅、深静脉网络收集各组织的血液；肺静脉将富含氧的血液从肺部送回心脏。'},
 {id:'nervous',name:'神经系统',color:'#d8b565',description:'脑、脊髓和周围神经传递并处理信号，参与感觉、运动、协调，以及身体功能的自主调节。'},
 {id:'respiratory',name:'呼吸系统',color:'#b98991',description:'气道将空气输送至肺部，氧气和二氧化碳在肺内进行气体交换。呼吸运动依靠呼吸肌产生的压力变化。'},
 {id:'digestive',name:'消化系统',color:'#b8916b',description:'消化道分解食物、吸收营养和水分，并将废物向后输送。辅助消化器官提供胆汁与消化酶。'},
 {id:'urinary',name:'泌尿系统',color:'#b47961',description:'肾脏过滤血液，调节体液、电解质和酸碱平衡。尿液经输尿管进入膀胱，再由尿道排出。'},
 {id:'lymphatic',name:'淋巴系统',color:'#879f7c',description:'淋巴管将多余的组织液送回血液循环。淋巴结及其他淋巴器官参与免疫监测与免疫应答。'},
 {id:'endocrine',name:'内分泌系统',color:'#c5a09a',description:'内分泌器官将激素释放到血液中，协调代谢、生长、应激反应和生殖等过程。'},
 {id:'reproductive',name:'生殖系统',color:'#bda098',description:'这里展示的男性生殖结构参与精子的生成、成熟和运输，以及性激素的分泌。'},
 {id:'integumentary',name:'体表',color:'#ba9b7d',description:'体表提供人体外部的解剖参照。皮肤系统形成保护屏障，并参与感觉和体温调节。'},
 {id:'connective',name:'结缔组织',color:'#aec3bb',description:'软骨、韧带及其他结缔组织支撑、连接并分隔各个结构，帮助稳定关节、分散机械负荷。'},
];
export interface Part {id:string;name:string;conceptId:string;system:SystemId;chunk:number;positions:number;normals:number;indices:number;vertexCount:number;indexCount:number;bounds:[number[],number[]]}
export interface Concept {id:string;name:string;elements:string[]}
export interface Atlas {version:string;sex?:'male';source?:string;scope?:string;parts:Part[];concepts:Concept[];chunks:{url:string;bytes:number;gzip?:string;gzipBytes?:number}[];triangles:number}
export type View = 'three-quarter'|'front'|'back'|'side';
export interface SceneState {inspectorOpen?:boolean;explode:number;visible:SystemId[];selected:string[];isolate:boolean;view:View;rotate:boolean;reset:number}
export const DEFAULT_VISIBLE:SystemId[] = ['cardiac','sensory','skeletal','muscular','arterial','venous','nervous','respiratory','digestive','urinary','lymphatic','endocrine','reproductive','connective'];
export const EXPLANATIONS:Record<string,string> = {
 'heart':'位于胸腔内的肌性泵。右侧将血液送往肺部，左侧将血液送入体循环。',
 'liver':'位于膈右侧下方的大型器官，处理吸收的营养物质、产生胆汁，并合成多种血浆蛋白。',
 'brain':'神经系统的中枢器官。相互连接的脑区参与感知、运动、记忆、语言和身体功能调节。',
 'stomach':'位于食管与小肠之间的肌性囊状器官，暂存食物，并将其与胃酸和消化酶混合后送入十二指肠。',
 'spleen':'位于左上腹的淋巴器官，过滤血液、清除衰老血细胞，并参与免疫应答。',
 'pancreas':'兼具消化与内分泌功能的腹部器官，向小肠提供消化酶，并分泌胰岛素、胰高血糖素等激素。',
 'urinary bladder':'位于盆腔内的肌性储尿器官，储存由肾脏经输尿管输送来的尿液。',
 'trachea':'连接喉与支气管的主要气道，软骨支架使其在呼吸时保持开放。',
 'diaphragm':'分隔胸腔与腹腔的宽大肌肉。收缩时扩大胸腔容积，帮助空气进入肺部。',
};
export function explanation(name:string,system:SystemId){return EXPLANATIONS[name.toLowerCase()] ?? SYSTEMS.find(s=>s.id===system)?.description ?? '';}
