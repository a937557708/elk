

 useradd elsearch -g elsearch 
 groupadd elsearch
chown -R elsearch:elsearch  /home/tjr/elk/elasticsearch-7.1.1
su elsearch
chown -R elsearch /home/tjr/elk/elasticsearch-7.1.1


mkdir -pv /data/elasticsearch/{data,logs}
mkdir -pv /data/logstash/{data,logs}


vim /etc/elasticsearch/elasticsearch.yml
path.data: /home/tjr/elk/elasticsearch-7.1.1/data
path.logs: /home/tjr/elk/elasticsearch-7.1.1/logs
network.host: 0.0.0.0
http.port: 9200


问题[1]
[1]: max file descriptors [4096] for elasticsearch process is too low, increase to at least [65536]
	 max number of threads [1024] for user [elsearch] likely too low, increase to at least [2048]
解决办法
# vim /etc/security/limits.conf
	 加入下面的内容
	 * soft nofile 65536
	 * hard nofile 131072
	 * soft nproc 2048
	 * hard nproc 4096
 # vim /etc/security/limits.d/20-nproc.conf
 	 * sort nproc 65535
 	 root soft nproc unlimited
问题[2]
[2]: max virtual memory areas vm.max_map_count [65530] is too low,
     increase to at least [262144]
解决办法
# vim /etc/sysctl.conf 
	vm.max_map_count=655360
# sysctl -p 
问题[3]
 [3]: system call filters failed to install; check the logs and fix
      your configuration or disable system call filters at your own risk
解决办法
# vim ./conf/elasticsearch.yml
    bootstrap.memory_lock:false
    bootstrap.system_call_filter:false	
切换用户 重新启动elasticsearch
启动后，没有问题就说明启动成功。如果启动后出现下面的内容

 ERROR: [1] bootstrap checks failed
       [1]: max file descriptors [4096] for elasticsearch process is too low, increase to at least [65536]
1
2
解决办法
在配置文件limits.conf的末尾再加上下面的字段

# vim /etc/security/limits.conf
	* hard nofile 65536
	* soft nofile 65536 


elasticsearch-head-master:
Gruntfile.js   ：  hostname:'0.0.0.0',
npm install 
npm run dev


logstash-7.1.1 :
node.name: tongjiarong    #设置节点名称，一般写主机名
path.data: /home/tjr/elk/logstash-7.1.1/plugin-data    #创建logstash 和插件使用的持久化目录
config.reload.automatic: true    #开启配置文件自动加载
config.reload.interval: 10    #定义配置文件重载时间周期
http.host: "0.0.0.0"    #定义访问主机名，一般为域名或IP
创建config/logstash.conf
bin/logstash-plugin install logstash-input-jdbc
bin/logstash-plugin install logstash-output-elasticsearch

./bin/logstash -f ./config/gss.conf 

./bin/logstash -f ./config/sakila_address.conf 









