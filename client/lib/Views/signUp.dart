import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:shared_preferences/shared_preferences.dart';

import 'package:client/Common/http-request.dart';
import 'package:client/Views/login.dart';

class SignUpScreen extends StatelessWidget {
  SignUpScreen({super.key});

  final TextEditingController usernameController = TextEditingController();
  final TextEditingController passwordController = TextEditingController();

  void onClick() async {
    try {
      final response = await httpPostRequest(
        route: '/api/auth/register',
        body: {
          'username': usernameController.text,
          'password': passwordController.text,
        },
        successCode: 201,
      );
      Get.off(() => LoginScreen());
    } catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Container(
          color: Colors.white,
          height: 500,
          width: 400,
          child: Padding(
            padding: const EdgeInsets.all(40.0),
            child: Column(
              children: [
                SizedBox(height: 50),
                TextField(
                  controller: usernameController,
                  decoration: InputDecoration(
                    labelText: 'Username',
                  ),
                ),
                SizedBox(height: 20),
                TextField(
                  controller: passwordController,
                  decoration: InputDecoration(
                    labelText: 'Password',
                  ),
                ),
                Spacer(flex: 3),
                ElevatedButton(
                  onPressed: () {
                    onClick();
                  },
                  child: Text('Sign-Up'),
                ),
                SizedBox(height: 50),
                TextButton(
                  onPressed: () {
                    Get.off(() => LoginScreen());
                  },
                  child: Text('Login'),
                ),
                Spacer(),
              ],
            ),
          ),
        ),
      ),
    );
  }
}
