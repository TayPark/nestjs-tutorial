# NestJS tutorial

## Todos

- [x] 프레임워크 기본적인 사용과 타입스크립트 경험
- [ ] MySQL /w Prisma
- [ ] GraphQL
- [ ] Message queue (Kafka? ZMQ? RabbitMQ?) 

## 느낀점

> 2020.12.23

- Routing

기존의 *Node.js* 웹 백엔드 프레임워크들은 구조가 정해져있지 않았다. 가장 대표적인 Express.js는 router만 준다. boilerplate같은 best practices를 보면 SRP 원칙을 적용하려 router와 controller를 알아서 나누어서 사용했다. router는 요청이 들어올 주소나 parameter를 정의하고, controller에서 비즈니스 로직을 처리했다. 예를들어 아래와 같다.

```
routers
ㄴ index.js
  ㄴ users
    ㄴ index.js (router, import controller)
    ㄴ users.controller.js
  ㄴ boards
    ㄴ index.js
    ㄴ boards.controller.js
  ㄴ auth
  ㄴ ...
```

반면에 `NestJS`는 *Spring*이나 *Django* 같은 프레임워크에서 볼 수 있는 **DI(Dependency Injection)** 가 적용되어있다. DI는 사용하는 객체를 직접 생성하지 않고 *비즈니스 로직을 처리하는 클래스의 생성자를 사용하여 처리*한다. 이로 인해 얻는 장점은 코드간 **낮은 결합도**를 유지할 수 있다는 점이다.

또한 코드 제너레이터부터 샘플코드를 만들 때부터 *SRP 원칙*이 적용되어있다. 앞서 설명한 Express를 사용했을 때 처럼 귀찮게 분리할 필요가 없고, controller(router)와 service(process business logic)를 시작부터 철저하게 분리한다. 또한 *DTO(Data Transfer Object)*, 데이터를 사용할 때 정의하는 일종의 인터페이스를 정의함으로써 조직의 협업 구조가 클 때 유용하게 적용될것이라 생각한다.

하루동안 가지고 놀면서 가장 유용했던 점을 3줄 요약하면

1. 타입스크립트의 **타입 체크**
2. 자바스크립트에서 볼 수 없었던 **코드 힌트(실수 줄이기)**
3. **코드 린트**(~~가끔 귀찮아도 잡아주니 뭐...~~)
4. `nest g controller/module/service ...` (~~이것이 모던 웹프로그래밍이다 희망편~~)
